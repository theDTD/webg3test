import React from 'react';
import renderer from 'react-test-renderer';
import HowItWorks from '../../../../main/react/components/sellback/howItWorks';
import HowItWorksBox from '../../../../main/react/components/sellback/howItWorksBox';

describe('HowItWorks', () => {

    it('should render correctly', () => {
        const data = [{"id": 1, "icon": "icon1", "header": "header books", "body": "body1"},
                                {"id": 2, "icon": "icon2", "header": "header ship", "body": "body2"},
                                {"id": 3, "icon": "icon3", "header": "header paid", "body": "body3"}];
        const component = <HowItWorks data={data}/>;
        const renderedComponent = renderer.create(component);
        const root = renderedComponent.root;

        expect(root.props.data.length).toEqual(3);
        const howItWorksSection = root.findByType("section").props.children;
        expect(howItWorksSection.length).toEqual(2);

        const howItWorksH2 = howItWorksSection[0].props.children;
        expect(howItWorksH2.type).toEqual("h2");
        expect(howItWorksH2.props.className).toEqual("how-it-works-title");
        expect(howItWorksH2.props.children).toEqual("How it works");

        const howItWorksBoxSection = howItWorksSection[1].props.children;
        expect(howItWorksBoxSection.type).toEqual("div");

        const howItWorksBoxes = howItWorksBoxSection.props.children;
        expect(howItWorksBoxes.length).toEqual(3);
        expect(howItWorksBoxes[0].type).toEqual(HowItWorksBox);
        expect(howItWorksBoxes[1].type).toEqual(HowItWorksBox);
        expect(howItWorksBoxes[2].type).toEqual(HowItWorksBox);
    });
});