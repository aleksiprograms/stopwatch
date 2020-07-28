import React from 'react';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

const EditPopupMenu = ({ stopwatch, onPressReset, onPressRename, onPressDelete }) => {
    return (
        <Menu>
            <MenuTrigger text="EDIT" customStyles={triggerStyles} />
            <MenuOptions customStyles={optionsStyles}>
                <MenuOption onSelect={() => onPressReset()} text="RESET" />
                <MenuOption onSelect={() => onPressRename(stopwatch)} text="RENAME" />
                <MenuOption onSelect={() => onPressDelete(stopwatch.id)} text="DELETE" />
            </MenuOptions>
        </Menu>
    );
};

const triggerStyles = {
    triggerText: {
        color: "#000000",
        fontWeight: "bold",
        fontSize: 20,
    },
    triggerWrapper: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#4fc3f7",
        borderRadius: 6,
        width: 66,
        height: 33,
    },
};

const optionsStyles = {
    optionsContainer: {
        backgroundColor: "#4fc3f7",
        borderRadius: 6,
        padding: 2,
    },
    optionWrapper: {
        backgroundColor: "#202020",
        borderRadius: 3,
        margin: 2,
    },
    optionText: {
        color: "#ffffff",
        fontSize: 16,
        padding: 3,
    },
};

export default EditPopupMenu;