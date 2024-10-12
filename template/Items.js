export default class Items 
{
    static #ID = {};
    static #CLASSES = {};

    static addElement(id, element)
    {
        Items.#ID[id] = element;
    }

    static addClassItem(className, element)
    {
        if (Items.#CLASSES[className] === undefined) {
            Items.#CLASSES[className] = [element];
        } else {
            Items.#CLASSES[className].push(element);
        }
    }
    
    static getElementById(id)
    {
        return Items.#ID[id];
    }

    static getElementsByClassName(className)
    {
        return Items.#CLASSES[className];
    }
}