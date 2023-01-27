import React, { Component } from 'react';

class Form extends Component {
  render() {
    return (
      <form>
        <label htmlFor="cardName">
          Nome
          <input type="text" data-testid="name-input" name="cardName" id="cardName" />
        </label>
        <label htmlFor="description">
          Descrição
          <textarea
            type="text"
            data-testid="description-input"
            name="description"
            id="description"
          />
        </label>
        <label htmlFor="attr1">
          Attr1
          <input type="number" data-testid="attr1-input" name="attr1" id="attr1" />
        </label>
        <label htmlFor="attr2">
          Attr2
          <input type="number" data-testid="attr2-input" name="attr2" id="attr2" />
        </label>
        <label htmlFor="attr3">
          Attr3
          <input type="number" data-testid="attr3-input" name="attr3" id="attr3" />
        </label>
        <label htmlFor="cardImage">
          Imagem
          <input type="text" data-testid="image-input" name="cardImage" id="cardImage" />
        </label>
        <label htmlFor="rareSelect">
          Raridade
          <select name="rareSelect" id="rareSelect" data-testid="rare-input">
            <option value="normal">Normal</option>
            <option value="raro">Raro</option>
            <option value="muito raro">Muito raro</option>
          </select>
        </label>
        <label htmlFor="checkTrunfo">
          Super Trybe Trunfo
          <input type="checkbox" data-testid="trunfo-input" name="checkTrunfo" id="checkTrunfo" />
        </label>
        <button data-testid="save-button">Salvar</button>
      </form>
    );
  }
}

export default Form;
