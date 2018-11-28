import { convertHighlightedText } from './convert';
describe('verify convert function', () => {

    it('return highlighted text in html format', () => {
        expect(convertHighlightedText('\u003cem\u003etest\u003c/em\u003e')).toEqual(`<b style="background:yellow;">test</b>`);
    });

    it('return highlighted number in html format', () => {
        expect(convertHighlightedText('\u003cem\u003e123456\u003c/em\u003e')).toEqual(`<b style="background:yellow;">123456</b>`);
    });

});
