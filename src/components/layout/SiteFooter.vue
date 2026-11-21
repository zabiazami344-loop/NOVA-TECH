<script setup>
// The footer is identical on all 9 pages in the original project, so in Vue it
// exists exactly once, here. No data, no behaviour - just markup plus the year.
// new Date() is a JavaScript built-in, so there is nothing to import.
const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container">
      <div class="footer__grid">
        <div class="footer__col footer__col--brand">
          <router-link to="/" class="navbar__logo footer__logo">
            <span class="navbar__logo-icon" aria-hidden="true">N</span>
            <span class="navbar__logo-text">NOVA<span>TECH</span></span>
          </router-link>
          <p class="footer__about">
            Product design and engineering for useful, reliable digital experiences.
          </p>
        </div>

        <div class="footer__col">
          <h4 class="footer__title">Company</h4>
          <ul class="footer__links">
            <li><router-link to="/about">About Us</router-link></li>
            <li><router-link to="/team">Our Team</router-link></li>
            <li><router-link to="/careers">Careers</router-link></li>
            <li><router-link to="/blog">Blog</router-link></li>
            <li><router-link to="/contact">Contact</router-link></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4 class="footer__title">Services</h4>
          <ul class="footer__links">
            <li><router-link to="/services">Web Development</router-link></li>
            <li><router-link to="/services">Mobile Apps</router-link></li>
            <li><router-link to="/services">AI Solutions</router-link></li>
            <li><router-link to="/services">Cyber Security</router-link></li>
            <li><router-link to="/services">Cloud Solutions</router-link></li>
          </ul>
        </div>

        <div class="footer__col">
          <h4 class="footer__title">Contact</h4>
          <ul class="footer__links footer__links--contact">
            <li><router-link to="/contact">Open the inquiry form</router-link></li>
          </ul>
        </div>
      </div>

      <div class="footer__bottom">
        <!-- {{ }} = interpolation. Vue re-renders this if `year` ever changes. -->
        <p>&copy; {{ year }} NOVA TECH. All rights reserved.</p>
        <p class="footer__demo-note">Demo site · Inquiry submissions are not delivered.</p>
      </div>
    </div>
  </footer>
</template>
