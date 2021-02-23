import React, { Component } from 'react';
import Aux from '../../Hoc/Aux';
import Burger from '../../Components/Burger/Burger';
import BuildControls from '../../Components/Burger/BuildControls/BuildControls';
import Modal from '../../Components/UI/Modal/Modal';
import OrderSummary from '../../Components/Burger/OrderSummary/OrderSummary';

const ingredientPrices = {
  salad: 0.5,
  bacon: 0.5,
  cheese: 0.5,
  meat: 0.75,
};

class BrugerBuilder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0,
      },
      totalPrice: 4,
      purchasable: false,
      purchasing: false,
    };

    this.addIngredientHandler = this.addIngredientHandler.bind(this);
    this.removeIngredientHandler = this.removeIngredientHandler.bind(this);
    this.purchaseHandler = this.purchaseHandler.bind(this);
    // this.updatePurchaseState = this.updatePurchaseState.bind(this);
  }

  purchaseHandler() {
    this.setState({ purchasing: true });
  }

  addIngredientHandler(type) {
    const oldCount = this.state.ingredients[type];
    const updateCount = oldCount + 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;
    const priceAddition = ingredientPrices[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice + priceAddition;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  }

  removeIngredientHandler(type) {
    const oldCount = this.state.ingredients[type];
    if (oldCount <= 0) {
      return;
    }
    const updateCount = oldCount - 1;
    const updatedIngredients = {
      ...this.state.ingredients,
    };
    updatedIngredients[type] = updateCount;
    const priceDeduction = ingredientPrices[type];
    const oldPrice = this.state.totalPrice;
    const newPrice = oldPrice - priceDeduction;

    this.setState({ totalPrice: newPrice, ingredients: updatedIngredients });
  }

  // TODO: FIX THIS

  // updatePurchaseState() {
  //   const ingredients = {
  //     ...this.state.ingredients,
  //   };
  //   const sum = Object.keys(ingredients)
  //     .map((igKey) => {
  //       return ingredients[igKey];
  //     })
  //     .reduce((acc, curr) => {
  //       return acc + curr;
  //     }, 0);
  //   this.setState({
  //     purchasable: sum > 0,
  //   });
  // }

  render() {
    const disabledInfo = {
      ...this.state.ingredients,
    };

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <Modal show={this.state.purchasing}>
          <OrderSummary ingredients={this.state.ingredients} />
        </Modal>
        <BuildControls
          ingredientAdded={this.addIngredientHandler}
          removeIngredient={this.removeIngredientHandler}
          disabled={disabledInfo}
          price={this.state.totalPrice}
          purchasable={this.state.totalPrice <= 4 ? 'disabled' : null}
          ordered={this.purchaseHandler}
        />
      </Aux>
    );
  }
}

export default BrugerBuilder;
