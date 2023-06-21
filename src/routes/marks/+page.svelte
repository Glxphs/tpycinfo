<script>
    import Meta from "$lib/Meta.svelte";

    let subjects = [
        {
            name: "中文",
            id: "chi",
            weight: 4
        },
        {
            name: "英文",
            id: "eng",
            weight: 4
        },
        {
            name: "數學",
            id: "math",
            weight: 2
        },
        {
            name: "公社",
            id: "csd",
            weight: 1
        },
        {
            name: "選修1",
            id: "e1",
            weight: 2
        },
        {
            name: "選修2",
            id: "e2",
            weight: 2
        },
        {
            name: "選修3",
            id: "e3",
            weight: 2
        },
    ]

    let avg = 0;
    function calculateAvg() {
        let sum = 0;
        let weightSum = 0;
        for (let subject of subjects) {
            let mark = parseFloat(subject.mark) || 0
            sum += mark * subject.weight
            weightSum += subject.weight
        }
        avg = sum / weightSum


    }
</script>

<Meta title="平均分計算器"/>
<div class="max-w-7xl mx-auto p-8 space-y-4">
    <h5 class="header">平均分計算器(F4)</h5>
    <div class="p-6 border-slate-500 border rounded-lg shadow-md">
        {#each subjects as subject}
            <div class="flex items-center p-1">
                <label for={subject.id}
                       class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">{subject.name}</label>
                <input type="text" id={subject.id}
                       class="ml-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 focus:ring-2"
                       bind:value={subject.mark} on:change={calculateAvg}>
            </div>
        {/each}
        <div class="block mb-2 text-sm font-bold text-gray-900 dark:text-white">平均分: {avg.toFixed(2)}</div>
    </div>
</div>