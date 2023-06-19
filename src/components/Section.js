export class Section {
    constructor({ items, renderer }, selector) {
        // items - массив объектов с полями name: string, link: string
        // renderer - функция
        // selector - строка
        this._items = items;
        this._renderer = renderer;
        this._container = document.querySelector(selector);
    }

    renderItems() {
        this._items.forEach((item) => {
            this._renderer(item);
        });
    }

    addItem(element, type = 'prepend') {
        if (type === 'prepend') {
            this._container.prepend(element);
        } else if (type === 'append') {
            this._container.append(element);
        }
    }
}
