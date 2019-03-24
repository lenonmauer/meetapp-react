export const mockFormDataAppend = jest.fn();

const FormData = jest.fn().mockImplementation(() => ({ append: mockFormDataAppend }));

global.FormData = FormData;
