import React, { PureComponent } from "react";
import "./ProgressBar.style.scss";
import icon from "./checked.svg";

export default class ProgressBar extends PureComponent {
	constructor(props) {
		super(props);
    this.barRef = React.createRef(null);
		this.state = {
			steps: [],
			currentStep: "",
		};
	}

	componentDidMount() {
		// init steps
		console.log("mounted");
		const steps = this.props.steps.map((step, index) => {
			if (index === 0) {
				return { title: step, state: "inProgress" };
			}
			return { title: step, state: "notActive" };
		});
		const currentStep = this.props.steps[0];
		console.log("currentStep", currentStep);
		this.setState({ steps: steps, currentStep });
    this.barRef.current.style.width = (1/this.props.steps.length)
	}
	componentDidUpdate(prevProps) {
		let isCurrentStep = false;
		if (prevProps.currentStep !== this.state.currentStep) {
			console.log(prevProps.currentStep, "--", this.state.currentStep);
			const array = this.state.steps.map((step) => {
				if (step.title !== prevProps.currentStep && !isCurrentStep) {
					return { ...step, state: "checked" };
				} else if (step.title === prevProps.currentStep) {
					isCurrentStep = true;
					return { ...step, state: "inProgress" };
				} else return step;
			});
			this.setState({ steps: array, currentStep: prevProps.currentStep });
		}
	}
  handleProgressBar = () => {
    const unChecked = this.state.steps.filter(step => step.state === "notActive")
    console.log("eee",(this.state.steps.length - unChecked.length)/this.state.steps.length)
    return ((this.state.steps.length - unChecked.length)/this.state.steps.length)*100
  }
	render() {
		const steps = this.props.steps;

		console.log("steppppp", this.state.steps);
		return (
			<div className="progress-bar">
				<progress value={this.handleProgressBar()} max="100"  className="progress-bar__bar" ref={this.barRef}></progress>
				<div className="progress-bar__steps">
					{this.state.steps &&
						this.state.steps.map((step, index) => {
							const spn =
								step.state === "checked" ? (
									<span>
										<img src={icon} alt="checked" />
									</span>
								) : (
									<span>{index + 1}</span>
								);
							return (
								<div
									className={`progress-bar__step ${
										step.state === "notActive"
											? "progress-bar__step--not-active"
											: "progress-bar__step--active"
									}`}
									key={step}
									style={
										index + 1 === this.state.steps.length
											? { display: "none" }
											: {}
									}
								>
									{spn}
									<p>{step.title}</p>
								</div>
							);
						})}
				</div>
			</div>
		);
	}
}
