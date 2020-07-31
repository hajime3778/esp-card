<template>
  <div>
    <div v-if="isSelectable">
      <v-card class="d-inline-block mx-auto" @click.stop="dialog = true">
        <v-img height="250" width="150" :src="`${ this.card.image }`"></v-img>
      </v-card>
      <v-dialog v-model="dialog" max-width="600">
        <v-card>
          <v-card-title class="headline">カードを選択してください</v-card-title>

          <v-card-text>
            <div style="text-align: center">
              <v-card
                class="choice-card d-inline-block mx-auto"
                v-for="card in this.answerChoices"
                :key="card.position"
                @click="selectCard(card)"
              >
                <v-img height="180" width="100" :src="`${ card.image }`"></v-img>
              </v-card>
            </div>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="resetCard">リセット</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
    <div v-else>
      <v-card class="d-inline-block mx-auto">
        <v-img height="250" width="150" :src="`${ card.image }`"></v-img>
      </v-card>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { Card, CardType, createAnswerChoices } from "../models/card";

@Component
export default class SelectableCard extends Vue {
  private dialog = false;
  private answerChoices: Card[] = [];

  @Prop({ default: true })
  public isSelectable!: boolean;

  @Prop()
  public card!: Card;

  public created() {
    this.card.image = CardType.back;
    this.answerChoices = createAnswerChoices();
  }

  @Emit("select")
  public select(val: Card) {
    return val;
  }
  private selectCard(choiceCard: Card) {
    this.dialog = false;
    const card: Card = {
      position: this.card.position,
      image: choiceCard.image
    };
    this.select(card);
  }

  @Emit("reset")
  public reset(val: Card) {
    return val;
  }
  private resetCard() {
    this.dialog = false;
    const card: Card = {
      position: this.card.position,
      image: CardType.back
    };
    this.reset(card);
  }
}
</script>

<style scoped>
.choice-card {
  margin: 10px;
}
</style>