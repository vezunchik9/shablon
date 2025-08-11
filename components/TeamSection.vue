<template>
  <section class="team">
    <h2 class="team__title">НАША КОМАНДА</h2>

    <div class="team__grid">
      <article v-for="m in members" :key="m.name" class="card">
        <img :src="m.photo" :alt="m.name" class="card__img" loading="lazy" />
        <h3 class="card__name">{{ m.name }}</h3>
        <p class="card__role">{{ m.position }}</p>
        <p class="card__exp">{{ m.experience }}</p>
      </article>
    </div>
  </section>
</template>

<script setup>
const members = [
  { name: 'Алексей Сергеевич Фёдоров', position: 'Мастер',          experience: 'Стаж более 15 лет', photo: '/images/team/master.jpg'  },
  { name: 'Иван Андреевич Петров',     position: 'Мастер',          experience: 'Стаж более 15 лет', photo: '/images/team/master2.jpg' },
  { name: 'Дмитрий Викторович Соколов', position: 'Старший мастер',  experience: 'Стаж более 20 лет', photo: '/images/team/master3.jpg' },
  { name: 'Сергей Александрович Кузнецов', position: 'Мастер',      experience: 'Стаж более 10 лет', photo: '/images/team/master4.jpg' },
  { name: 'Николай Игоревич Орлов',   position: 'Мастер',            experience: 'Стаж более 10 лет', photo: '/images/team/master5.jpg' }
]
</script>

<style scoped>
.team { padding: 56px 16px; background: #fff; text-align: center; }
.team__title { margin: 0 0 20px; font-size: 32px; font-weight: 900; text-transform: uppercase; }
.team__grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 20px; max-width: 1200px; margin: 0 auto; }
.card { background: #fff; border: 1px solid var(--gray-300); border-radius: 14px; padding: 16px; }
.card__img { width: 100%; height: 220px; object-fit: cover; border-radius: 10px; }
.card__name { margin: 10px 0 4px; font-size: 18px; font-weight: 800; }
.card__role { margin: 0; color: #333; font-weight: 700; }
.card__exp { margin: 2px 0 0; color: #555; }
</style>