/*
  ContactForm.tsx
  ---------------
  Purpose:
    - Encapsulates the "Send a raven" contact interface as a modal form.
    - Uses Formspree for a simple serverless POST endpoint to accept messages
      (suitable for demo sites and small projects). You may replace this with
      your own backend webhook or server-side handler if desired.

  Security & privacy notes:
    - We POST JSON to Formspree; no sensitive authentication is stored here.
    - Consider server-side validation or rate-limiting if this form is public
      (Formspree provides anti-spam measures, but extra server-side checks
      can help for production applications).

  Accessibility notes:
    - Modal uses Ionic's <IonModal> which manages focus trap/order for modal
      dialogs; ensure modal close buttons are reachable and have aria-labels.
    - Visible success/error messages are rendered after submission. For
      improved screen-reader feedback, consider adding an aria-live region.
*/

import React, { useState } from "react";
import {
  IonButton,
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButtons,
  IonIcon,
  IonItem,
  IonLabel,
  IonInput,
  IonTextarea,
} from "@ionic/react";
import { closeOutline } from "ionicons/icons";
import "./ContactForm.css";

// Formspree endpoint: a convenient serverless endpoint for receiving form submissions. 
const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdkqygln";

const ContactForm: React.FC = () => {
  // Modal + submission state
  // - isContactOpen: whether the modal dialog is visible
  // - isSubmitting: disables inputs while the request is in-flight
  // - submitSuccess / submitError: status messages for UX feedback
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Field-level validation errors. We maintain a small object for name/email/message
  // so we can show inline messages beside each input for better UX.
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    message?: string;
  }>({});
  // Refs for form controls so we can programmatically focus the first invalid
  // field when validation fails. We use `any` here to avoid coupling to
  // Ionic's internal element types; the web components expose `setFocus()`.
  const nameRef = React.useRef<any>(null);
  const emailRef = React.useRef<any>(null);
  const messageRef = React.useRef<any>(null);

  // Helper to focus the first error in the order: name, email, message
  const focusFirstError = (errs: { name?: string; email?: string; message?: string }) => {
    if (errs.name) return nameRef.current?.setFocus?.();
    if (errs.email) return emailRef.current?.setFocus?.();
    if (errs.message) return messageRef.current?.setFocus?.();
  };
  // Controlled form fields
  // Using controlled components keeps the current field values in React state
  // and makes it trivial to clear the form or validate before submission.
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  /*
    openContact: Prepare and open the modal.
    - Reset success/error state so previous submissions don't persist visually
    when reopening the form.
  */
  const openContact = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
    setIsContactOpen(true);
  };

  // closeContact: closes the modal; the current field values remain in state
  // so a user can re-open the modal without losing in-progress input if needed.
  const closeContact = () => setIsContactOpen(false);

  /*
    handleContactSubmit
    - Prevents the default form submission and performs client-side
      validation (simple presence checks). For production-grade forms you
      should also validate email format and consider rate-limiting.
    - While submitting we disable form inputs and show a sending state.
    - On error we show a friendly message; on success we clear fields and
      show a transient success message which auto-closes the modal.

    Security notes:
      - The form includes a `_gotcha` hidden field (honeypot) to trap
        basic spam bots that fill all form inputs. This is a simple anti-spam
        measure but not a substitute for server-side protections.
      - Consider adding server-side CAPTCHA, rate-limiting, or an email
        verification step for higher-security scenarios.
  */
  // Simple email validation helper (keeps complexity low but covers common cases)
  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Reset previous errors
    setSubmitError(null);
    setFieldErrors({});

    // Client-side validation: presence + email format + reasonable message length
    const errors: { name?: string; email?: string; message?: string } = {};
    if (!contactName.trim()) errors.name = "Please enter your name.";
    if (!contactEmail.trim()) errors.email = "Please enter your email address.";
    else if (!isValidEmail(contactEmail.trim()))
      errors.email = "Please enter a valid email (example: you@example.com).";
    if (!contactMessage.trim() || contactMessage.trim().length < 4)
      errors.message = "Please enter a brief message (4+ characters).";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      // Focus the first field with an error to help keyboard users
      focusFirstError(errors);
      // Keep submitError null — inline field errors are the actionable items.
      return;
    }

    setIsSubmitting(true);
    setSubmitSuccess(false);

    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: contactName,
          email: contactEmail,
          message: contactMessage,
          _subject: "A raven arrives…",
          // _gotcha is an anti-spam honeypot field left intentionally blank
          _gotcha: "",
        }),
      });

      // Try to parse any JSON body returned by the endpoint
      const data = await response.json().catch(() => null);

      if (!response.ok) {
        // Handle known cases: field-level validation errors (Formspree
        // sometimes returns an `errors` array) or top-level error messages
        if (data?.errors && Array.isArray(data.errors)) {
          const serverFieldErrors: { name?: string; email?: string; message?: string } = {};
          data.errors.forEach((err: any) => {
            // Formspree often uses `field` and `message` keys
            if (err.field && err.message) {
              serverFieldErrors[err.field as keyof typeof serverFieldErrors] = err.message;
            }
          });

          if (Object.keys(serverFieldErrors).length > 0) {
            setFieldErrors(serverFieldErrors);
            // Focus the first server-reported field error for accessibility
            focusFirstError(serverFieldErrors);
            return;
          }
        }

        // Rate limiting
        if (response.status === 429) {
          setSubmitError("You're sending messages too quickly — please try again later.");
          return;
        }

        // Generic server message
        const topError = data?.error || "Form submission failed. Please try again later.";
        setSubmitError(topError);
        return;
      }

      // Success
      setSubmitSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");

      // Close the modal after a short success message
      setTimeout(() => {
        setIsContactOpen(false);
        setSubmitSuccess(false);
      }, 1500);
    } catch (err) {
      // Network or unexpected error
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <IonButton
        className="hero-cta"
        shape="round"
        size="large"
        onClick={openContact}
      >
        Send a raven
      </IonButton>

      <IonModal
        isOpen={isContactOpen}
        onDidDismiss={closeContact}
        className="contact-modal"
      >
        {/*
          Modal header + close control:
            - Close button is labelled and disabled while submitting to avoid
              accidental cancellation.
            - IonModal from Ionic handles focus management so keyboard users
              are kept inside the modal until it closes.
        */}
        <IonHeader>
          <IonToolbar className="contact-toolbar">
            <IonTitle>Send a Raven</IonTitle>
            <IonButtons slot="end">
              <IonButton
                onClick={closeContact}
                aria-label="Close"
                disabled={isSubmitting}
              >
                <IonIcon icon={closeOutline} />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>

        {/*
          The form itself is accessible and progressive:
            - Hidden inputs mirror the visible fields for Formspree's convenience
            - `_gotcha` is a honeypot used to detect naive bots (left hidden)
            - Consider adding an `aria-live` region to announce submit success
              or errors to screen-reader users.
        */}
        <form className="contact-body" onSubmit={handleContactSubmit}>
          <p className="contact-note">Send us a message and a raven will return shortly.</p>

          {/* ARIA live region for announcing success/errors to screen readers */}
          <div aria-live="polite" className="contact-announce" style={{ position: "absolute", left: -9999 }}>
            {submitSuccess ? "Message sent" : submitError ? submitError : ""}
          </div>

          {/* Hidden mirror inputs: kept for the remote endpoint's compatibility */}
          <input type="hidden" name="name" value={contactName} />
          <input type="hidden" name="email" value={contactEmail} />
          <input type="hidden" name="message" value={contactMessage} />
          <input type="hidden" name="_subject" value="A raven arrives…" />

          {/* Honeypot anti-spam field (should remain empty in normal usage) */}
          <input type="text" name="_gotcha" style={{ display: "none" }} />

          {/*
            Name field
              - Uses IonInput for consistent cross-platform styling
              - Label positioned stacked to keep a clear reading order
          */}
          <IonItem className={`contact-item ${fieldErrors.name ? "is-invalid" : ""}`} lines="none">
            <IonLabel position="stacked">Your Name</IonLabel>
            <IonInput
              ref={nameRef}
              value={contactName}
              onIonInput={(e) => {
                setContactName(e.detail.value ?? "");
                setFieldErrors((prev) => ({ ...prev, name: undefined }));
              }}
              placeholder="Sylvia"
              aria-invalid={!!fieldErrors.name}
              aria-describedby={fieldErrors.name ? "contact-name-error" : undefined}
            />
          </IonItem>
          {fieldErrors.name && (
            <div id="contact-name-error" className="contact-field-error" role="alert">
              {fieldErrors.name}
            </div>
          )}

          {/*
            Email field
              - Uses type="email" and inputMode to improve on-screen keyboard
                layouts on mobile devices and to hint at validation semantics.
              - Client-side email regex validation provides immediate feedback.
          */}
          <IonItem className={`contact-item ${fieldErrors.email ? "is-invalid" : ""}`} lines="none">
            <IonLabel position="stacked">Your Email</IonLabel>
            <IonInput
              ref={emailRef}
              value={contactEmail}
              onIonInput={(e) => {
                setContactEmail(e.detail.value ?? "");
                setFieldErrors((prev) => ({ ...prev, email: undefined }));
              }}
              placeholder="you@example.com"
              inputMode="email"
              type="email"
              aria-invalid={!!fieldErrors.email}
              aria-describedby={fieldErrors.email ? "contact-email-error" : undefined}
            />
          </IonItem>
          {fieldErrors.email && (
            <div id="contact-email-error" className="contact-field-error" role="alert">
              {fieldErrors.email}
            </div>
          )}

          {/*
            Message field
              - IonTextarea autoGrow makes it comfortable for longer messages
              - Keep the placeholder helpful but concise
          */}
          <IonItem className={`contact-item ${fieldErrors.message ? "is-invalid" : ""}`} lines="none">
            <IonLabel position="stacked">Message</IonLabel>
            <IonTextarea
              ref={messageRef}
              value={contactMessage}
              onIonInput={(e) => {
                setContactMessage(e.detail.value ?? "");
                setFieldErrors((prev) => ({ ...prev, message: undefined }));
              }}
              autoGrow
              placeholder="Tell us what you want to forge…"
              aria-invalid={!!fieldErrors.message}
              aria-describedby={fieldErrors.message ? "contact-message-error" : undefined}
            />
          </IonItem>
          {fieldErrors.message && (
            <div id="contact-message-error" className="contact-field-error" role="alert">
              {fieldErrors.message}
            </div>
          )}

          {/*
            Actions: Cancel + Send
              - Cancel closes the modal without submitting
              - Send submits the form and is disabled while submitting to
                prevent double-submits
              - The send button is also disabled while client-side validation
                errors exist to prevent wasted requests.
          */}
          <div className="contact-actions">
            <IonButton fill="clear" type="button" onClick={closeContact} disabled={isSubmitting}>
              Cancel
            </IonButton>

            <IonButton
              type="submit"
              className="contact-send"
              shape="round"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Sending…" : "Send"}
            </IonButton>
          </div>

          {/* Visual feedback for users */}
          {submitSuccess && <p className="contact-success">🐦‍⬛ Raven sent successfully!</p>}
          {submitError && <p className="contact-error">{submitError}</p>}
        </form>
      </IonModal>
    </>
  );
};

export default ContactForm;
