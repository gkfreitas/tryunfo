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
      filterName: '',
      filterRare: 'todas',
      filterTrunfo: false,
      cardSaves: [],
    };
  }

  onInputChange({ target }) {
    const { name, type } = target;
    const value = type === 'checkbox' ? target.checked : target.value;
    if (name === 'cardTrunfo') this.setState({ hasTrunfo: value });
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
      hasTrunfo: false,
      cardTrunfo: false,
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
      filterName,
      filterRare,
      filterTrunfo,
    } = this.state;

    const cardsElements = cardSaves.map((e, index) => (
      <div key={ e.cardName + e.cardAttr1 + index }>
        <Card
          key={ e.cardName + e.cardAttr1 + index }
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
          key={ e.cardImage.toString() + index }
          onClick={ () => this.removeCard(index) }
          data-testid="delete-button"
        >
          Excluir
        </button>
      </div>
    ));

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
        <label htmlFor="name-filter">
          Filtro de busca:
          <input
            disabled={ filterTrunfo }
            type="text"
            data-testid="name-filter"
            id="name-filter"
            name="filterName"
            onChange={ this.onInputChange }
            value={ filterName }
          />
        </label>
        {/* .props.children[0].props.cardName */}
        <select
          onChange={ this.onInputChange }
          name="filterRare"
          value={ filterRare }
          data-testid="rare-filter"
          disabled={ filterTrunfo }
        >
          <option>todas</option>
          <option>normal</option>
          <option>raro</option>
          <option>muito raro</option>
        </select>
        <label htmlFor="filterTrunfo">
          Super Trybe Trunfo
          <input
            type="checkbox"
            data-testid="trunfo-filter"
            name="filterTrunfo"
            id="filterTrunfo"
            checked={ filterTrunfo }
            onChange={ this.onInputChange }
          />
        </label>
        { filterName || filterRare !== 'todas'
        || filterTrunfo ? cardsElements.filter((e) => {
            const rare = e.props.children[0].props.cardRare;
            const name = e.props.children[0].props.cardName;
            const case1 = name.toUpperCase().includes(filterName.toUpperCase());
            let case2 = rare.toUpperCase() === filterRare.toUpperCase();
            let case3 = e.props.children[0].props.cardTrunfo;
            if (filterRare === 'todas') case2 = true;
            if (filterTrunfo === false) case3 = true;
            const verify = case1 && case2 && case3;
            return verify;
          }) : cardsElements }

      </div>
    );
  }
}

export default App;
