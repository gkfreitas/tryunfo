import React from 'react';
import Card from './components/Card';
import Form from './components/Form';

class App extends React.Component {
  constructor() {
    super();
    this.onInputChange = this.onInputChange.bind(this);
    this.buttonDisabled = this.buttonDisabled.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.removeCard = this.removeCard.bind(this);
    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      hasTrunfo: false,
      isSaveButtonDisabled: true,
      cardSaves: [],
    };
  }

  onInputChange({ target }) {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    if (type === 'checkbox') this.setState({ hasTrunfo: value });
    this.setState({
      [name]: value,
    }, this.buttonDisabled, this.onSaveButtonClick);
  }

  onSaveButtonClick() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      hasTrunfo,
      cardTrunfo,
      cardRare,
    } = this.state;

    this.setState((oldState) => ({
      cardName: '',
      cardDescription: '',
      cardImage: '',
      cardAttr1: '0',
      cardAttr2: '0',
      cardAttr3: '0',
      cardRare: 'normal',
      isSaveButtonDisabled: true,
      cardSaves: [...oldState.cardSaves, {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        hasTrunfo,
        cardTrunfo,
        cardRare,
      }],
    }));
  }

  removeCard(index) {
    const { cardSaves } = this.state;
    const newArray = [...cardSaves];
    newArray.splice(index, 1);
    this.setState({ cardSaves: newArray });
  }

  buttonDisabled() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
    } = this.state;
    const maxNumber = 90;
    const minNumber = 0;
    const maxSumNumber = 210;
    const disabledCases = [
      !cardName.length,
      !cardImage.length,
      !cardDescription.length,
      cardAttr1 > maxNumber,
      cardAttr1 < minNumber,
      cardAttr2 > maxNumber,
      cardAttr2 < minNumber,
      cardAttr3 > maxNumber,
      cardAttr3 < minNumber,
      parseInt(cardAttr1, 10)
      + parseInt(cardAttr2, 10) + parseInt(cardAttr3, 10) > maxSumNumber,
    ];
    const verify = disabledCases.every((error) => error === false);
    this.setState({
      isSaveButtonDisabled: !verify,
    });
  }

  render() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
      isSaveButtonDisabled,
      hasTrunfo,
      cardSaves,
    } = this.state;
    return (
      <div>
        <Form
          onInputChange={ this.onInputChange }
          onSaveButtonClick={ this.onSaveButtonClick }
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
          hasTrunfo={ hasTrunfo }
          cardSaves={ cardSaves }
          isSaveButtonDisabled={ isSaveButtonDisabled }
        />
        <Card
          cardName={ cardName }
          cardDescription={ cardDescription }
          cardAttr1={ cardAttr1 }
          cardAttr2={ cardAttr2 }
          cardAttr3={ cardAttr3 }
          cardImage={ cardImage }
          cardRare={ cardRare }
          cardTrunfo={ cardTrunfo }
        />
        { cardSaves.map((e, index) => (
          (
            <>
              <Card
                key={ e.cardName }
                cardName={ e.cardName }
                cardDescription={ e.cardDescription }
                cardAttr1={ e.cardAttr1 }
                cardAttr2={ e.cardAttr2 }
                cardAttr3={ e.cardAttr3 }
                cardImage={ e.cardImage }
                cardRare={ e.cardRare }
                cardTrunfo={ e.cardTrunfo }
              />
              <button
                key={ `${e.cardName}KEY` }
                onClick={ () => this.removeCard(index) }
                data-testid="delete-button"
              >
                Excluir

              </button>
            </>
          )
        ))}
      </div>
    );
  }
}

export default App;
