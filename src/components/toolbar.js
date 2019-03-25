import React from "react";
import Collapsible from "react-collapsible";
import { DragDropContainer } from "react-drag-drop-container";
import Button from "react-bootstrap/Button";

import ImageElement from "./imageElement";

export default class Toolbar extends React.PureComponent {
	constructor(props) {
		super(props);
		this.state = {
			elementList: {},
			imagesDimension: {}
		};
		for (let i = 0; i < props.componentSchemas.length; i++) {
			let obj = props.componentSchemas[i];
			if (props.activeTier < obj.tier) return;
			let category = obj.category;
			let element = {
				id: `${obj.title}-${i}`,
				schema: obj
			};
			if (this.state.elementList[category] === undefined) {
				this.state.elementList[category] = [];
			}
			this.state.elementList[category].push(element);
		}

		this.updatedDimensions = this.updatedDimensions.bind(this);
	}

	updatedDimensions(id, width, height) {
		let newImagesDimension = Object.assign({}, this.state.imagesDimension);
		if (newImagesDimension[id] !== undefined) {
			if (
				newImagesDimension[id].width >= width ||
				newImagesDimension[id].height >= height
			)
				return;
		}
		newImagesDimension[id] = { width, height };
		this.setState({ imagesDimension: newImagesDimension });
		//this.imagesDimension = newImagesDimension;
	}

	createCategoryItems(key) {
		let elementList = this.state.elementList;
		let imageElements = [];
		let imagesDimension = this.state.imagesDimension;
		let stylesContainer = {};
		let stylesImages = {};
		elementList[key].map(item => {
			let width =
				imagesDimension[item.id] === undefined
					? 100
					: imagesDimension[item.id].width;
			let height =
				imagesDimension[item.id] === undefined
					? 100
					: imagesDimension[item.id].height;
			stylesContainer[item.id] = {
				width: `${width + 20}px`,
				height: `${height + 20}px`,
				padding: "10px"
			};
			stylesImages[item.id] = {
				width: `${width}px`,
				height: `${height}px`
			};
		});
		elementList[key].map(item =>
			imageElements.push(
				<ImageElement
					key={`ImageElement-${item.id}`}
					id={item.id}
					image={`${this.props.imagesPath}${item.schema.image}`}
					name={item.schema.title}
					updateDimensions={this.updatedDimensions}
					style={stylesImages[item.id]}
				/>
			)
		);
		let categoryItems = [];
		elementList[key].map((item, index) =>
			categoryItems.push(
				<div key={"div" + item.id} style={stylesContainer[item.id]}>
					<DragDropContainer
						targetKey="canvas"
						key={"draggable" + item.id}
						dragClone={true}
						dragData={{
							source: "toolbar",
							id: item.id,
							schema: item.schema
						}}
					>
						{imageElements[index]}
					</DragDropContainer>
				</div>
			)
		);
		const styleContainer = {
			display: "flex",
			flexDirection: "row",
			flexWrap: "wrap",
			alignItems: "center",
			margin: "5px"
		};
		return <div style={styleContainer}>{categoryItems}</div>;
	}

	// 	<Button className="collapse-btn" key={`Trigger${key}`} size="lg">
	// 	{key}
	// </Button>
	createCategories() {
		const style = {
			width: "100%",
			display: "flex",
			justifyContent: "space-between"
		};
		const styleTransitionClose = {
			transition: "transform 300ms",
			transform: "rotateZ(0deg)"
		};
		const styleTransitionOpen = {
			transition: "transform 300ms",
			transform: "rotateZ(-90deg)"
		};
		let elementList = this.state.elementList;
		let toolbar = [];
		Object.keys(elementList).forEach(key => {
			toolbar.push(
				<Collapsible
					key={`Collapsible${key}`}
					trigger={
						<Button key={`Trigger${key}`} size="lg" style={style}>
							<div>{key}</div>
							<div style={styleTransitionClose}>&#9665;</div>
						</Button>
					}
					triggerWhenOpen={
						<Button key={`Trigger${key}`} size="lg" style={style}>
							<div>{key}</div>
							<div style={styleTransitionOpen}>&#9665;</div>
						</Button>
					}
				>
					{this.createCategoryItems(key)}
				</Collapsible>
			);
		});
		return toolbar;
	}

	render() {
		let imagesDimension = this.state.imagesDimension;
		let elementList = this.state.elementList;
		if (
			imagesDimension.length !== 0 &&
			imagesDimension.length !== elementList.length
		)
			return;
		const style = {
			boxSizing: "border-box",
			backgroundColor: "LightGray",
			borderBottom: "2px solid",
			borderTop: "2px solid",
			width: "25%",
			color: "black",
			overflow: "auto",
			OverflowEvent: "hidden",
			textAlign: "center",
			verticalAlign: "middle"
		};
		let toolbar = this.createCategories();
		return <div style={style}>{toolbar}</div>;
	}
}
