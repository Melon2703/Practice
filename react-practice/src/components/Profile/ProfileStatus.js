import React from "react";
import {Field, reduxForm} from "redux-form";


class ProfileStatus extends React.Component{


    constructor(props) {
        super(props);
        this.state = {
            isMode: false,
        };
    }

    changeMode = () => {

        this.setState((state, props) => ({
            isMode: !state.isMode,
        }))

    }

    onSubmit = (formData) => {
        this.setState((state, props) => ({
            isMode: !state.isMode,
        }));
        this.props.setStatus(formData.StatusForm);
    }

    componentDidUpdate(prevProps, prevState) {

        if (this.props.status !== prevProps.status) {

            this.setState({
                status: this.props.status
            })

        }

    }

    render() {

        return (
            <div>
                { !this.state.isMode ?

                    <div>
                        <span onDoubleClick={this.changeMode}>{this.props.status}</span>
                    </div> :

                    <div>
                        <ReduxStatus onSubmit={this.onSubmit} value={this.props.value}/>
                    </div>
                }
            </div>
        )
    }

}

const StatusForm = (props) => {

    return (
        <form onBlur={props.handleSubmit}>
            <Field component='input' name='StatusForm' autoFocus={true} />
        </form>
    )
}

let ReduxStatus = reduxForm({
    form: `status`
})(StatusForm)

export default ProfileStatus;