import Items from "./Items";

export default function initializeComponent(data) 
{
    if (data.props != undefined) {
        if (data.props.id != undefined) {
            Items.addElement(data.props.id, data);
        }

        if (data.props.class != undefined) {
            data.props.class.split(" ").forEach((element) => {
                Items.addClassItem(element, data);
            });
        }
    }
} 