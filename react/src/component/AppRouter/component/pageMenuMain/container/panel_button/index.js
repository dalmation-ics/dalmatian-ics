import React, {Component} from 'react';
import PropTypes from 'prop-types';
import './public/style.css';

class PanelButton extends Component {

    static propTypes = {
        text: PropTypes.string.isRequired,
        display: PropTypes.any.isRequired,
        onClick: PropTypes.func,
        disabled: PropTypes.bool,
    };

    render() {

        const {
            display,
            text,
            onClick,
            disabled,
        } = this.props;

        return (
            <div className='col-xs-12 col-sm-4 col-md-3 col-lg-2'>
                <button
                    className="panel panel-info panel-button panel-button-full-width"
                    onClick={() => {
                        if (!disabled && onClick) {
                            onClick();
                        }
                    }}>
                    <div className="panel-body panel-button-body text-center">
                        {display}
                    </div>
                    <div className="panel-button-footer">
                        <h4 className={disabled ?
                            'text-muted' :
                            null}>{text}</h4>
                    </div>
                </button>
            </div>
        );

    }

}

export default PanelButton;
