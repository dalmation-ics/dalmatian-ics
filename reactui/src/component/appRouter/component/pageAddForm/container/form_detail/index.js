import React, {Component} from 'react';

type props = {
	form: any
}

class FormDetail extends Component<props> {

	componentDidMount() {

	}

	render() {

		const {form} = this.props;

		if (form) {
			return (
				<div className="card card-default">
					<h3 className="card-title">{form.name}</h3>
					<div className="card-body">
						<div className="scrollBox"
						     dangerouslySetInnerHTML={{
							     __html: form.detail || '',
						     }}/>
					</div>
				</div>
			);
		} else {
			return (
				<div className="card card-default">
					<div className="card-title">
						{NO_FORM.title}
					</div>
					<div className="card-body">
						{NO_FORM.subtitle}
					</div>
				</div>
			);
		}

	}

}

export const NO_FORM = {
	title: "No Form Selected",
	subtitle:"Please return to the home screen and create or open a form."
}

export default FormDetail;
