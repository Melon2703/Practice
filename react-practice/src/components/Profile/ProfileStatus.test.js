import TestRenderer from 'react-test-renderer';
import React from "react";
import ProfileStatusWithHoocks from "./ProfileStatusWithHoocks";

describe(`all tests of ProfileStatus`, () => {

    // test(`check state.isMode`, () => {
    //     const Status = TestRenderer.create(<ProfileStatusWithHoocks />);
    //     const inst = Status.getInstance();
    //     expect(inst.state.isMode).toBe(false);
    // });

    test(`what does the span contain `, () => {
        const Status = TestRenderer.create(<ProfileStatusWithHoocks status={123}/>);
        const root = Status.root;
        const span = root.findByType(`span`)
        expect(span.children[0]).toBe(`123`);
    })

    test(`is span`, () => {
        const Status = TestRenderer.create(<ProfileStatusWithHoocks status={123}/>);
        const root = Status.root;
        const span = root.findByType(`span`)
        expect(span).not.toBeNull();
    })

    test(`input`, () => {
        const Status = TestRenderer.create(<ProfileStatusWithHoocks status={123}/>);
        const root = Status.root;
        expect(() => {
            const input = root.findByType(`input`)
        }).toThrow();
    })


    // test(`input new`, () => {
    //     let Status;
    //     act(() => {
    //          Status = TestRenderer.create(<ProfileStatusWithHoocks status={123}/>);
    //     });
    //     const root = Status.root;
    //     const span = root.findByType(`span`);
    //     act(() => {
    //         span.props.onDoubleClick();
    //     });
    //
    //     expect(span).not.toBeNull();
    // })

});