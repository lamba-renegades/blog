import remark from 'remark';
import html from 'remark-html';

import markdownToHtml from './markdown-to-html.ts';

jest.mock('remark');

describe('markdownToHtml', () => {
  test('use remark', async () => {
    const title = '# title';
    const mockedResult = '<h1>title</h1>';

    const toStringFunction = jest.fn().mockReturnValue(mockedResult);
    const processFunction = jest
      .fn()
      .mockResolvedValue({ toString: toStringFunction });
    const useFunction = jest.fn().mockReturnValue({ process: processFunction });
    const remarkFunction = jest.fn().mockReturnValue({ use: useFunction });

    remark.mockImplementation(remarkFunction);

    const result = await markdownToHtml(title);
    expect(result).toEqual(mockedResult);
    expect(remarkFunction).toHaveBeenCalled();
    expect(useFunction).toHaveBeenCalledWith(html);
    expect(processFunction).toHaveBeenCalledWith(title);
    expect(toStringFunction).toHaveBeenCalled();
  });
});
