import React from 'react';
import renderer from 'react-test-renderer';
import WarningBanner from '../../../../main/react/components/sellback/warningBanner';

const renderBaseTest = (props) => {

    const component = <WarningBanner textBookTitle={props.textBookTitle} listItemCount={props.listItemCount} />;
    const renderedComponent = renderer.create(component);
    const root = renderedComponent.root;

    const warningBanner = root.findByType(WarningBanner).type;
    expect(warningBanner).toEqual(WarningBanner);

    const warningBannerProps = root.findByType(WarningBanner).props;
    expect(warningBannerProps.textBookTitle).toEqual(props.textBookTitle);
    expect(warningBannerProps.listItemCount).toEqual(props.listItemCount);

    const section = root._fiber.child.stateNode;
    expect(section.type).toEqual("section");

    const sectionDiv = section.props.children;
    expect(sectionDiv.type).toEqual("div");
    expect(sectionDiv.props.className).toEqual("warning-banner warning-banner-text");

    const sectionDivChildren = sectionDiv.props.children;
    expect(sectionDivChildren.length).toEqual(3);

    let displayDefault = "Your sellback list is empty! Search for more books to get started on a new list";
    if (props.listItemCount > 0) {
       displayDefault = props.textBookTitle + " has been removed.";
    }

    const displayText = sectionDivChildren[0];
    expect(displayText).toEqual(displayDefault);
    expect(sectionDivChildren[2].type).toEqual("span");
    expect(sectionDivChildren[2].props.children).toEqual("Undo");
};

describe('WarningBanner', () => {
    it('should render with textbook title', () => {
        renderBaseTest({
            textBookTitle: "Molecular Biology",
            listItemCount: 1
        });
    });
    it('should render using default text', () => {
        renderBaseTest({
            textBookTitle: "",
            listItemCount: 0
        });
    });
});