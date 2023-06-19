export class Card {

    constructor(data, selectorTemplate, handleCardClick) {
        this._link = data.link;
        this._name = data.name;
        this._alt = data.name;
        this._selectorTemplate = selectorTemplate;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        return document.querySelector(this._selectorTemplate).content.querySelector('.element').cloneNode(true);
    }

    createCardNode() {
        this._elementNode = this._getTemplate();
        this._imageNode = this._elementNode.querySelector('.element__image');
        this._nameNode = this._elementNode.querySelector('.element__name');
        this._likeNode = this._elementNode.querySelector('.element__like');
        this._trashNode = this._elementNode.querySelector('.element__trash');
        
        this._imageNode.src = this._link;
        this._imageNode.alt = this._name;
        this._nameNode.textContent = this._name;

        this._addEventListeneres();

        return this._elementNode;
    }

    _addEventListeneres() {
        this._trashNode.addEventListener('click', this._trashClick);
        this._imageNode.addEventListener('click', this._imgClick);
        this._likeNode.addEventListener('click', this._likeClick);
    }

    _imgClick = () => {
        this._handleCardClick(this._name, this._link);
    }

    _likeClick = () => {
        this._likeNode.classList.toggle('element__like_active');
    }

    _trashClick = () => {
        this._elementNode.remove();
    }


}