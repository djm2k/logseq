import { expect } from '@playwright/test'
import { test } from './fixtures'
import {
    createRandomPage,
    enterNextBlock,
    modKey,
    repeatKeyPress,
    moveCursor,
    selectCharacters,
    getSelection,
    getCursorPos,
} from './utils'

test('checkboxes should work when contents is bold', async ({ page, block }) => {
    await createRandomPage(page)

    await block.mustFill('### Lorem List\n* [ ] **Lorem Item 1**')
    await block.escapeEditing()
    await expect(page.getByRole("checkbox")).toHaveCount(1)


    // <input type="checkbox" class="-snip-" checked=""
    const checkedRegExp = /<input type="checkbox" class="[^"]+"( checked(?:="[^"]?")?)/;
    // <input type="checkbox" class="-snip-"
    const uncheckedRegExp = /<input type="checkbox" class="[^"]+"(?! checked(?:="[^"]?")?)/;

    let blockInnerHTML = await page.locator('.ls-block .block-content >> nth=0').innerHTML()
    expect(blockInnerHTML).toContain('<h3>Lorem List</h3>')
    expect(blockInnerHTML).toMatch(uncheckedRegExp);

    await page.getByRole("checkbox").click();

    blockInnerHTML = await page.locator('.ls-block .block-content >> nth=0').innerHTML()
    expect(blockInnerHTML).toContain('<h3>Lorem List</h3>')
    expect(blockInnerHTML).toMatch(checkedRegExp)
})