<script setup>
import PageHero from '@/components/layout/PageHero.vue'
import CtaStrip from '@/components/layout/CtaStrip.vue'
import BlogExplorer from '@/components/explorers/BlogExplorer.vue'
</script>

<template>
  <!--
    "Blog & Insights" is a static string, so writing it as-is in the template
    is clearer than routing it through the data file. Vue escapes the & for us.
  -->
  <div class="blog-page">
    <PageHero
      title="Blog & Insights"
      crumb="Blog"
      desc="Ideas, lessons and behind-the-scenes stories from our engineering, design, AI and security teams."
    />

    <section class="blog-page__spotlight container">
      <div class="blog-page__intro">
        <span class="blog-page__eyebrow">Fresh thinking</span>
        <h2>Real stories from the people building digital products.</h2>
        <p>
          Explore practical lessons, product strategy, AI experimentation, and the
          systems behind meaningful software.
        </p>

        <div class="blog-page__actions">
          <router-link to="/contact" class="btn btn--primary">Book a call</router-link>
          <router-link to="/projects" class="btn btn--outline">View projects</router-link>
        </div>
      </div>

      <div class="blog-page__stats" aria-label="Blog stats">
        <div class="blog-page__stat">
          <strong>28+</strong>
          <span>Insights shared</span>
        </div>
        <div class="blog-page__stat">
          <strong>8K</strong>
          <span>Readers this year</span>
        </div>
        <div class="blog-page__stat">
          <strong>94%</strong>
          <span>Client engagement</span>
        </div>
      </div>
    </section>

    <BlogExplorer />

    <CtaStrip
      title="Want To Work With Us?"
      desc="Explore our open roles or start a conversation."
      cta="See Careers"
      to="/careers"
    />
  </div>
</template>

<style scoped>
.blog-page {
  position: relative;
}

.blog-page__spotlight {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 32px;
  align-items: center;
  padding-top: 50px;
  padding-bottom: 16px;
}

.blog-page__intro {
  padding: 40px 36px;
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.06);
  border-radius: 30px;
  box-shadow: 0 18px 40px rgba(10, 132, 255, 0.08);
  backdrop-filter: blur(18px);
  -webkit-backdrop-filter: blur(18px);
}

.blog-page__eyebrow {
  display: inline-flex;
  margin-bottom: 18px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(10, 132, 255, 0.1);
  color: #0a84ff;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.blog-page__intro h2 {
  font-size: clamp(2.2rem, 2vw + 1.2rem, 3.4rem);
  line-height: 1.08;
  letter-spacing: -0.05em;
  margin-bottom: 18px;
}

.blog-page__intro p {
  color: rgba(29, 29, 31, 0.7);
  font-size: 1.08rem;
  max-width: 620px;
}

.blog-page__actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-top: 28px;
}

.blog-page__stats {
  display: grid;
  gap: 18px;
}

.blog-page__stat {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 26px 22px;
  border-radius: 24px;
  background: linear-gradient(180deg, rgba(255,255,255,0.9), rgba(255,255,255,0.72));
  border: 1px solid rgba(0, 0, 0, 0.05);
  box-shadow: 0 12px 30px rgba(15, 23, 42, 0.04);
}

.blog-page__stat strong {
  font-size: clamp(2rem, 2vw, 2.6rem);
  letter-spacing: -0.05em;
  color: #0a84ff;
}

.blog-page__stat span {
  color: rgba(29, 29, 31, 0.7);
  font-weight: 500;
}

@media (max-width: 760px) {
  .blog-page__spotlight {
    grid-template-columns: 1fr;
    padding-top: 24px;
  }

  .blog-page__intro {
    padding: 28px 22px;
  }

  .blog-page__actions {
    flex-direction: column;
  }

  .blog-page__actions .btn {
    width: 100%;
  }
}
</style>
