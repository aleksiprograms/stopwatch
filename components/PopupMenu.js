import React from 'react';
import {
    Menu,
    MenuOptions,
    MenuOption,
    MenuTrigger,
} from 'react-native-popup-menu';

const PopupMenu = ({ stopwatch, onPressReset, onPressRename, onPressDelete }) => {
    return (
        <Menu>
            <MenuTrigger text="EDIT" customStyles={triggerStyles} />
            <MenuOptions>
                <MenuOption onSelect={() => onPressReset()} text="RESET" />
                <MenuOption onSelect={() => onPressRename(stopwatch)} text="RENAME" />
                <MenuOption onSelect={() => onPressDelete(stopwatch.id)} text="DELETE" />
            </MenuOptions>
        </Menu>
    );
};

const triggerStyles = {
    triggerText: {
        fontSize: 20,
        color: "#ffffff",
    },
    triggerWrapper: {
        backgroundColor: "#5555ff",
        alignItems: 'center',
        justifyContent: 'center',
        width: 66,
        height: 33,
        flex: 1,
    },
    triggerTouchable: {
        underlayColor: 'darkblue',
        activeOpacity: 70,
        style: {
            flex: 1,
        },
    },
};

export default PopupMenu;