<script setup>
import PageHero from '@/components/layout/PageHero.vue'
import ContactForm from '@/components/contact/ContactForm.vue'
</script>

<template>
  <PageHero
    title="Contact Us"
    crumb="Contact"
    desc="Use the form to preview an inquiry. This demo stores submissions in this browser only."
  />

  <section class="contact-page section-pad">
    <div class="container contact__grid">
      <div class="contact-info" aria-label="Contact form information">
        <article class="contact-info__card">
          <div>
            <h4>Demo mode</h4>
            <p>There is no email delivery or remote inquiry service connected. Submissions stay in this browser and are visible only in its local dashboard.</p>
          </div>
        </article>
      </div>

      <!-- Right: the form -->
      <ContactForm />
    </div>
  </section>
</template>
