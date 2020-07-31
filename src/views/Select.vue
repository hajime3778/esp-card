<template>
  <div class="home">
    <div class="center">
      <SelectableCard
        class="cards-area"
        v-for="backCard in this.backCards"
        :key="backCard.position"
        :isSelectable="false"
        :card="backCard"
      ></SelectableCard>
    </div>

    <div class="center">
      <SelectableCard
        class="cards-area"
        v-for="selectCard in this.selectCards"
        :key="selectCard.position"
        :card="selectCard"
        @select="changeImage"
        @reset="changeImage"
      ></SelectableCard>
    </div>

    <!-- <p>{{ this.selectCards }}</p> -->
    <div class="center">
      <v-btn
        large
        class="check-answer-button"
        color="deep-purple accent-4"
        @click="checkAnswer"
        dark
      >答え合わせ</v-btn>
    </div>

    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-card-title class="headline">結果発表</v-card-title>
        <v-card-text>
          <div style="text-align: center">{{this.correctCount}}</div>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="reset">もう一度やる</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Card,
  NUMBER_OF_CARDS,
  createInitialCards,
  createAnswerCards
} from "../models/card";
import SelectableCard from "@/components/SelectableCard.vue";

@Component({
  components: {
    SelectableCard
  }
})
export default class Select extends Vue {
  public selectCards: Card[] = createInitialCards(NUMBER_OF_CARDS);
  public backCards: Card[] = createInitialCards(NUMBER_OF_CARDS);
  public answerCards: Card[] = createAnswerCards(NUMBER_OF_CARDS);
  private dialog = false;
  private correctCount = 0;

  private changeImage(card: Card) {
    const index = this.selectCards.findIndex(e => e.position === card.position);
    this.selectCards.splice(index, 1, card);
  }

  private checkAnswer() {
    this.backCards.splice(0, this.backCards.length);

    for (const answerCard of this.answerCards) {
      this.backCards.push(answerCard);
      const selectCard = this.selectCards.find(
        x => x.position === answerCard.position
      );

      if (selectCard === undefined) return;

      if (selectCard.image === answerCard.image) {
        this.correctCount++;
      }
    }
    this.dialog = true;
  }

  private reset() {
    this.dialog = false;
    this.correctCount = 0;
    this.selectCards = createInitialCards(NUMBER_OF_CARDS);
    this.backCards = createInitialCards(NUMBER_OF_CARDS);
    this.answerCards = createAnswerCards(NUMBER_OF_CARDS);
  }
}
</script>

<style scoped>
.cards-area {
  display: inline-block;
  margin: 10px;
}
.center {
  text-align: center;
}
.check-answer-button {
  height: 100px;
  width: 400px;
}
</style>