import React from "react";
import './Button.scss';

export type ButtonProps = {
    color: string;
    on: boolean;
    onClick: (color: string) => void;
    className?: string;
};

export type ButtonState = {
    
};

export class Button extends React.Component<ButtonProps, ButtonState> {

    constructor(props : ButtonProps){
        super(props);

        this.click = this.click.bind(this);
    } 

    render(){
        return (
            <div className={this.props.className + ' button ' + (this.props.on ? "on" : "off")} onClick={this.click}></div>
        );
    };

    click() {
        this.props.onClick(this.props.color);
    }
}