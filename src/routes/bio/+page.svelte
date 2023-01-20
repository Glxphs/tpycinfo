<script>
    import navtitle from "$lib/navtitle.js"
    import Cropper from "svelte-easy-crop";
    import getCroppedImg from "./canvasUtils";
    import {onMount} from "svelte";

    $navtitle = "Bio Image Generator"

    let filename = ""
    let mImages = []

    function addImage() {
        mImages = [...mImages, {
            id: mImages.length,
            name: ""
        }]
    }

    function removeImage(id) {
        // remove the image and make all the other ids correct
        mImages = mImages.filter((image) => image.id !== id)
        mImages = mImages.map((image, index) => {
            image.id = index
            return image
        })
    }

    let image, fileInput, pixelCrop;

    let crop = {x: 0, y: 0};
    let zoom = 1;

    let enableCrop = -1;

    function onFileSelected(e, imgId) {
        let imageFile = e.target.files[0];
        let reader = new FileReader();
        reader.onload = e => {
            image = e.target.result;
            enableCrop = imgId;
        };
        reader.readAsDataURL(imageFile);
    }

    async function cropImage(imgId) {
        mImages[imgId].image = await getCroppedImg(image, pixelCrop);
        enableCrop = -1;
        mImages = [...mImages]
    }

    let ctx, canvas;

    onMount(() => {
        ctx = canvas.getContext('2d');
    });

    let squareSize = 400
    let margin = 100
    let textpx = 40
    let textmargin = textpx + 10

    var styleMarker = '&';

    // table code style --> font style
    var styleCodeToStyle = {
        r: '',
        i: 'italic',
        b: 'bold',
        l: 'lighter'
    };

    function drawStyledText(ctx, text, x, y, font, fontSize) {
        // start with regular style
        var fontCodeStyle = 'r';
        do {
            // set context font
            ctx.font = buildFont(font, fontSize, fontCodeStyle);
            // find longest run of text for current style
            var ind = text.indexOf(styleMarker);
            // take all text if no more marker
            if (ind == -1) ind = text.length;
            // fillText current run
            var run = text.substring(0, ind);
            ctx.fillText(run, x, y);
            // return if ended
            if (ind == text.length) return;
            // move forward
            x += ctx.measureText(run).width;
            // update current style
            fontCodeStyle = text[ind + 1];
            // keep only remaining part of text
            text = text.substring(ind + 2);
        } while (text.length > 0)
    }


    function buildFont(font, fontSize, fontCodeStyle) {
        var style = styleCodeToStyle[fontCodeStyle];
        return style + ' ' + fontSize + 'px' + ' ' + font;
    }

    const underline = (ctx, text, x, y) => {
        let metrics = measureText(ctx, text)
        let fontSize = Math.floor(metrics.actualHeight * 1.4) // 140% the height
        switch (ctx.textAlign) {
            case "center" :
                x -= (metrics.width / 2);
                break
            case "right"  :
                x -= metrics.width;
                break
        }
        switch (ctx.textBaseline) {
            case "top"    :
                y += (fontSize);
                break
            case "middle" :
                y += (fontSize / 2);
                break
        }
        y += 5
        ctx.save()
        ctx.beginPath()
        ctx.strokeStyle = ctx.fillStyle
        ctx.lineWidth = Math.ceil(fontSize * 0.05)
        ctx.moveTo(x, y)
        ctx.lineTo(x + metrics.width, y)
        ctx.stroke()
        ctx.restore()
    }

    function download(canvas, filename) {
        /// create an "off-screen" anchor tag
        var lnk = document.createElement('a'), e;

        /// the key here is to set the download attribute of the a tag
        lnk.download = filename;

        /// convert canvas content to data-uri for link. When download
        /// attribute is set the content pointed to by link will be
        /// pushed as "download" in HTML5 capable browsers
        lnk.href = canvas.toDataURL("image/png;base64");

        /// create a "fake" click-event to trigger the download
        if (document.createEvent) {
            e = document.createEvent("MouseEvents");
            e.initMouseEvent("click", true, true, window,
                0, 0, 0, 0, 0, false, false, false,
                false, 0, null);

            lnk.dispatchEvent(e);
        } else if (lnk.fireEvent) {
            lnk.fireEvent("onclick");
        }
    }

    const measureText = (ctx, text) => {
        let metrics = ctx.measureText(text)
        return {
            width: Math.floor(metrics.width),
            height: Math.floor(metrics.fontBoundingBoxAscent + metrics.fontBoundingBoxDescent),
            actualHeight: Math.floor(metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent)
        }
    }

    function generate() {
        if (mImages.length === 0 || canvas === null) {
            return
        }
        download(canvas, filename + ".png")
    }

    $: {
        if (canvas != null && ctx != null && mImages.length > 0) {
            let n = mImages.length

            // find the title with most lines of mImages
            let maxLines = 0
            for (let i = 0; i < n; i++) {
                let lines = mImages[i].name.split("\\n").length
                if (lines > maxLines) {
                    maxLines = lines
                }
            }
            // find the longest line of all titles
            let maxLineLength = 0
            let maxLineLengthString;
            for (let i = 0; i < n; i++) {
                let lines = mImages[i].name.split("\\n")
                for (let j = 0; j < lines.length; j++) {
                    if (lines[j].length > maxLineLength) {
                        maxLineLength = lines[j].length
                        maxLineLengthString = lines[j]
                    }
                }
            }
            let origWidth = n * squareSize + n * margin

            if (n === 1 && measureText(ctx, maxLineLengthString).width > origWidth) {
                origWidth = measureText(ctx, maxLineLengthString).width + margin
            }

            canvas.width = origWidth
            canvas.height = squareSize + margin + textpx * maxLines
            let heightNoNewLines = squareSize + margin + textpx

            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "black";

            for (const [index, value] of mImages.entries()) {
                let x = canvas.width / 2 - (n * squareSize + (n - 1) * margin) / 2 + index * squareSize + index * margin

                if (value.image) {
                    let img = new Image();
                    img.onload = function () {
                        ctx.drawImage(img, x, heightNoNewLines / 2 - (squareSize + textmargin + textpx) / 2, squareSize, squareSize);
                    };
                    img.src = value.image;
                }

                let textyorig = heightNoNewLines / 2 - (squareSize + textmargin + textpx) / 2 + squareSize + textmargin
                const split = value.name.split("\\n");
                for (let ti = 0; ti < split.length; ti++) {
                    let text = split[ti];
                    let replacedtext = text.replaceAll(/&[ribl]/ig, "")
                    ctx.font = textpx + "px Arial"
                    let textx = x + squareSize / 2 - measureText(ctx, replacedtext).width / 2
                    let texty = textyorig + ti * textpx;
                    drawStyledText(ctx, text, textx, texty, "Arial", textpx)
                    underline(ctx, replacedtext, textx, texty)
                }
            }
        }
    }


</script>

<div class="container max-w-7xl mx-auto p-8 space-y-4">
    <h5 class="header">Biology Image Generator</h5>
    <div class="text">
        An image generator to generate microscope images for TPYC Biology.
    </div>
    <div class="p-6 border-slate-500 border rounded-lg shadow-md">
        <div class="border-b-slate-500 border-b py-3 mb-3">
            <div class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">相片檔案名稱</div>
            <input bind:value={filename} on:change={() => {mImages = [...mImages]}}
                   type="text"
                   class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-2"
                   placeholder="4D33_洋葱表皮細胞">
        </div>
        {#each mImages as imageObj}
            <div class="border-b-slate-500 border-b py-3 mb-3">
                <div class="flex items-center mb-2">
                    <div class="text-lg font-bold text-gray-900 dark:text-white">
                        顯微照片 {imageObj.id + 1}</div>
                    <button
                            on:click={() => removeImage(imageObj.id)}
                            type="button"
                            class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition">

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                            <path fill-rule="evenodd"
                                  d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                  clip-rule="evenodd"/>
                        </svg>

                    </button>

                </div>
                <div class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">標題</div>
                <input bind:value={imageObj.name}
                       type="text"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-2"
                       placeholder="洋葱表皮細胞 (200X)">
                <p class="mt-2 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    您可以使用格式代碼，例如<br/>
                    &b: 粗體, &i: 斜體, &r: 恢復正常, \n: 換行<br/>
                    例子: &iHydrilla &rcells (200X)
                </p>
                <div class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">照片</div>
                {#if enableCrop === imageObj.id}
                    <div class="flex mb-3">
                        <div class="relative w-80 h-80">
                            <Cropper
                                    image={image}
                                    aspect={1}
                                    maxZoom={10}
                                    zoomSpeed={0.1}
                                    bind:crop
                                    bind:zoom
                                    on:cropcomplete={(e) => pixelCrop = e.detail.pixels}
                            />
                        </div>
                    </div>
                    <button type="button"
                            class="border-gray-300 dark:border-gray-400 border inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition mb-3"
                            on:click={async () => {await cropImage(imageObj.id)}}>完成
                    </button>
                {:else}
                    <input class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 mb-3"
                           type="file" accept="image/*" on:change={(e)=>onFileSelected(e, imageObj.id)}
                           bind:this={fileInput}>
                {/if}
                {#if imageObj.image}
                    <img src={imageObj.image} class="w-40 h-40 rounded-xl mb-2">
                {/if}
            </div>
        {/each}
        <div class="flex items-center">
            <div class="font-bold">
                {mImages.length} 張顯微照片
            </div>
            <button
                    on:click={addImage}
                    type="button"
                    class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition">

                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z"/>
                </svg>
            </button>
        </div>
    </div>
    <div>
        <div class="flex items-center">
            <div class="font-bold mb-3 mr-3">預覽</div>
            <button type="button"
                    class="border-gray-300 dark:border-gray-400 border inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition mb-3"
                    on:click={generate}>
                    下載
            </button>
        </div>
        <canvas class="border-slate-500 shadow-md border rounded-xl h-auto max-w-full"
                bind:this={canvas}></canvas>
    </div>
</div>


