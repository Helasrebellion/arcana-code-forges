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

const FORMSPREE_ENDPOINT = "https://formspree.io/f/mdkqygln";

const ContactForm: React.FC = () => {
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  const openContact = () => {
    setSubmitSuccess(false);
    setSubmitError(null);
    setIsContactOpen(true);
  };

  const closeContact = () => setIsContactOpen(false);

  const handleContactSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!contactName.trim() || !contactEmail.trim() || !contactMessage.trim()) {
      setSubmitError("Please fill out all fields.");
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);
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
          _gotcha: "",
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => null);
        throw new Error(data?.error || "Form submission failed");
      }

      setSubmitSuccess(true);
      setContactName("");
      setContactEmail("");
      setContactMessage("");

      setTimeout(() => {
        setIsContactOpen(false);
        setSubmitSuccess(false);
      }, 1500);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again later.");
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

        <form className="contact-body" onSubmit={handleContactSubmit}>
          <p className="contact-note">
            Send us a message and a raven will return shortly.
          </p>

          <input type="hidden" name="name" value={contactName} />
          <input type="hidden" name="email" value={contactEmail} />
          <input type="hidden" name="message" value={contactMessage} />
          <input type="hidden" name="_subject" value="A raven arrives…" />
          <input type="text" name="_gotcha" style={{ display: "none" }} />

          <IonItem className="contact-item" lines="none">
            <IonLabel position="stacked">Your Name</IonLabel>
            <IonInput
              value={contactName}
              onIonInput={(e) => setContactName(e.detail.value ?? "")}
              placeholder="Sylvia"
            />
          </IonItem>

          <IonItem className="contact-item" lines="none">
            <IonLabel position="stacked">Your Email</IonLabel>
            <IonInput
              value={contactEmail}
              onIonInput={(e) => setContactEmail(e.detail.value ?? "")}
              placeholder="you@example.com"
              inputMode="email"
              type="email"
            />
          </IonItem>

          <IonItem className="contact-item" lines="none">
            <IonLabel position="stacked">Message</IonLabel>
            <IonTextarea
              value={contactMessage}
              onIonInput={(e) => setContactMessage(e.detail.value ?? "")}
              autoGrow
              placeholder="Tell us what you want to forge…"
            />
          </IonItem>

          <div className="contact-actions">
            <IonButton
              fill="clear"
              type="button"
              onClick={closeContact}
              disabled={isSubmitting}
            >
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

          {submitSuccess && (
            <p className="contact-success">🐦‍⬛ Raven sent successfully!</p>
          )}
          {submitError && <p className="contact-error">{submitError}</p>}
        </form>
      </IonModal>
    </>
  );
};

export default ContactForm;
