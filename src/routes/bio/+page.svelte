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

    onMount(() => {

    });
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
                <div class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">顯微照片 {imageObj.id + 1} 標題
                </div>
                <input bind:value={imageObj.name}
                       type="text"
                       class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-2 mb-3"
                       placeholder="洋葱表皮細胞 (200X)">
                <div class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">顯微照片 {imageObj.id + 1}</div>
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
                            class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 transition mb-3"
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
</div>


