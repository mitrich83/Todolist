describe('editableSpan', () => {
    it('base example, visually looks correct', async () => {
        // APIs from jest-puppeteer
        await page.goto('http://localhost:9009/iframe.html?id=todolist-editablespan--editable-span-story&args=&globals=backgrounds.grid:false;backgrounds.value:!hex(F8F8F8)&viewMode=story');

        const image = await page.screenshot();

        // API from jest-image-snapshot
        expect(image).toMatchImageSnapshot();
    });
});