<template>
  <section id="faults" class="faults">
    <div class="faults__overlay">
      <h2 class="faults__title">САМЫЕ ЧАСТЫЕ ПОЛОМКИ</h2>

      <div class="faults__grid">
        <article v-for="f in faults" :key="f.title" class="fault">
          <h3 class="fault__title">{{ f.title }}</h3>
          <ul class="fault__list">
            <li v-for="p in f.points" :key="p">- {{ p }}</li>
          </ul>
          <div class="fault__price">от {{ f.price }} рублей</div>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const faults = [
  {
    title: 'Не включается',
    points: ['Порван сетевой кабель', 'Сломана плата управления', 'Неисправен заливной клапан'],
    price: 490
  },
  {
    title: 'Не открывается',
    points: ['Сломана ручка', 'Неисправен замок дверцы люка', 'Программная ошибка'],
    price: 400
  },
  {
    title: 'Протекает',
    points: ['Поврежден сливной патрубок', 'Прохудилась резиновая манжета', 'Поврежден бак'],
    price: 450
  },
  {
    title: 'Шумит',
    points: ['Неисправны амортизаторы', 'Открутился фильтр помех', 'Требуется замена подшипников'],
    price: 400
  },
  {
    title: 'Не отжимает',
    points: ['Засорился слив', 'Сломался датчик уровня воды', 'Неисправен сливной насос'],
    price: 300
  },
  {
    title: 'Не сливает',
    points: ['Засорился слив', 'Программный сбой', 'Повреждены контакты насоса'],
    price: 350
  }
]
</script>

<style scoped>
.faults {
  position: relative;
  background: url('/images/why/bg.jpg') center / cover no-repeat;
  color: #fff;
}

.faults::before {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
}

.faults__overlay {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
  padding: 48px 16px 56px;
}

.faults__title {
  margin: 0 0 24px;
  text-align: center;
  font-size: 32px;
  font-weight: 900;
  letter-spacing: 0.5px;
  text-transform: uppercase;
}

.faults__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 24px;
}

.fault {
  background: #fff;
  color: #111;
  border-radius: 16px;
  padding: 20px 24px;
  box-shadow: 0 6px 22px rgba(0,0,0,0.12);
}

.fault__title {
  margin: 0 0 8px;
  font-size: 22px;
  font-weight: 800;
  text-align: center;
}

.fault__list {
  margin: 0 0 16px;
  padding-left: 0;
  list-style: none;
  line-height: 1.5;
  color: #333;
}

.fault__price {
  text-align: center;
  font-size: 20px;
  font-weight: 900;
}

@media (max-width: 1024px) {
  .faults__grid { grid-template-columns: repeat(2, 1fr); }
}

@media (max-width: 640px) {
  .faults__title { font-size: 26px; }
  .faults__grid { grid-template-columns: 1fr; }
}
</style>