const fs = require('fs-extra');
(async() => {
    try {
        const source = 'projects/event-library/src/lib/assets';
        const dest = 'dist/event-library/assets';
        const isAssetsExists = await fs.pathExists(dest)

        if (isAssetsExists) {
            await fs.remove(dest);
        }
        await fs.copy(source, dest)
    } catch (err) {
        console.error("Error while copying assets", err)
    }
})();
