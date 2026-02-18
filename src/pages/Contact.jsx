import { useState } from 'react'

export default function Contact() {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <main className="contact page">
        <h1>Contact</h1>
        <p>Thank you for your message. We will get back to you soon.</p>
      </main>
    )
  }

  return (
    <main className="contact page">
      <h1>Contact</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <label htmlFor="contact-name">Name</label>
        <input id="contact-name" type="text" name="name" required aria-required="true" />
        <label htmlFor="contact-email">Email</label>
        <input id="contact-email" type="email" name="email" required aria-required="true" />
        <label htmlFor="contact-message">Message</label>
        <textarea id="contact-message" name="message" rows="5" required aria-required="true" />
        <button type="submit" className="btn btn-primary">Send</button>
      </form>
    </main>
  )
}
