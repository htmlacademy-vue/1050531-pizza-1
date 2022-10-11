<template>
  <main class="content">
    <form action="#" method="post">
      <div class="content__wrapper">
        <h1 class="title title--big">Конструктор пиццы</h1>
        <div class="content__dough">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите тесто</h2>
            <div
              v-for="item in dough"
              :key="item.id"
              class="sheet__content dough"
            >
              <label
                class="dough__input"
                :class="`dough__input--${item.value}`"
              >
                <input
                  type="radio"
                  name="dought"
                  value="light"
                  class="visually-hidden"
                  checked
                />
                <b>{{ item.name }}</b>
                <span>{{ item.description }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="content__diameter">
          <div class="sheet">
            <h2 class="title title--small sheet__title">Выберите размер</h2>
            <div
              v-for="size in sizes"
              :key="size.id"
              class="sheet__content diameter"
            >
              <label
                class="diameter__input"
                :class="`diameter__input--${size.value}`"
              >
                <input
                  type="radio"
                  name="diameter"
                  value="`${size.value}`"
                  class="visually-hidden"
                />
                <span>{{ size.name }}</span>
              </label>
            </div>
          </div>
        </div>
        <div class="content__ingredients">
          <div class="sheet">
            <h2 class="title title--small sheet__title">
              Выберите ингредиенты
            </h2>
            <div class="sheet__content ingredients">
              <div class="ingredients__sauce">
                <p>Основной соус:</p>
                <div v-for="sauce in sauces" :key="sauce.id">
                  <label class="radio ingredients__input">
                    <input type="radio" name="sauce" value="tomato" checked />
                    <span>{{ sauce.name }}</span>
                  </label>
                </div>
              </div>
              <div class="ingredients__filling">
                <p>Начинка:</p>
                <ul
                  v-for="ingredient in ingredients"
                  :key="ingredient.id"
                  class="ingredients__list"
                >
                  <li class="ingredients__item">
                    <span
                      class="filling"
                      :class="`filling--${ingredient.value}`"
                      >{{ ingredient.name }}</span
                    >
                    <div class="counter counter--orange ingredients__counter">
                      <button
                        type="button"
                        class="counter__button counter__button--minus"
                        disabled
                      >
                        <span class="visually-hidden">Меньше</span>
                      </button>
                      <input
                        type="text"
                        name="counter"
                        class="counter__input"
                        value="0"
                      />
                      <button
                        type="button"
                        class="counter__button counter__button--plus"
                      >
                        <span class="visually-hidden">Больше</span>
                      </button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="content__pizza">
          <label class="input">
            <span class="visually-hidden">Название пиццы</span>
            <input
              type="text"
              name="pizza_name"
              placeholder="Введите название пиццы"
            />
          </label>
          <div class="content__constructor">
            <div class="pizza pizza--foundation--big-tomato">
              <div class="pizza__wrapper">
                <div class="pizza__filling pizza__filling--ananas"></div>
                <div class="pizza__filling pizza__filling--bacon"></div>
                <div class="pizza__filling pizza__filling--cheddar"></div>
              </div>
            </div>
          </div>
          <div class="content__result">
            <p>Итого: 0 ₽</p>
            <button type="button" class="button" disabled>Готовьте!</button>
          </div>
        </div>
      </div>
    </form>
  </main>
</template>

<script>
import misc from "@/static/misc.json";
import pizza from "@/static/pizza.json";
import user from "@/static/user.json";
import { getCroppedWord } from "@/common/helpers";

export default {
  name: "PizzaConstructor",
  data() {
    return {
      misc,
      pizza,
      user,
    };
  },
  computed: {
    sauces() {
      return pizza.sauces;
    },
    ingredients() {
      return pizza.ingredients.map((item) => {
        const stringImage = item.image;
        const resultString = getCroppedWord(stringImage);
        return {
          ...item,
          value: resultString,
        };
      });
    },
    dough() {
      return pizza.dough.map((item) => {
        const stringImage = item.image;
        const tempString = getCroppedWord(stringImage);
        const resultString = tempString.substr(6);
        return {
          ...item,
          value: resultString,
        };
      });
    },
    sizes() {
      return pizza.sizes.map((size) => {
        if (size.name === "23 см") {
          return {
            ...size,
            value: "small",
          };
        } else if (size.name === "32 см") {
          return {
            ...size,
            value: "normal",
          };
        } else if (size.name === "45 см") {
          return {
            ...size,
            value: "big",
          };
        } else {
          return size;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/assets/scss/layout/content.scss";
@import "~@/assets/scss/blocks/title.scss";
@import "~@/assets/scss/layout/sheet.scss";
@import "~@/assets/scss/visually-hidden.scss";
@import "~@/assets/scss/blocks/input.scss";
@import "~@/assets/scss/blocks/pizza.scss";
// На закомментированные стили проект ругается
// @import "~@/assets/scss/blocks/dough.scss";
// @import "~@/assets/scss/blocks/diameter.scss";
// @import "~@/assets/scss/blocks/ingredients.scss";
// @import "~@/assets/scss/blocks/counter.scss";
</style>
