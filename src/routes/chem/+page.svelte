<script>
    import Meta from "$lib/Meta.svelte";
    import MolarMass from "molarmass.js";

    const mm = new MolarMass();

    let formula = "C6H12O6";
    let mass;
    $: {
        mass = mm.getMolarMass(formula);
    }
</script>

<Meta title="Chem Tools"/>
<div class="container">
    <div class="row">
        <div class="col-12 col-lg-6 col-xl-4 py-3">
            <div class="card">
                <div class="card-header">
                    Molar mass calculator
                </div>
                <div class="card-body">
                    <label for="formula" class="form-text">Chemical Formula</label>
                    <input type="text" id="formula" class="form-control"
                           aria-describedby="chemical formula" bind:value={formula}>
                    <div id="formula-example" class="form-text">
                        Example: C6H12O6, CuSO4.5H2O, K3[Fe(CN)6]
                    </div>
<!--                    result-->
                    <div class="mt-3">
                        <div class="form-text">
                            Molar mass
                        </div>
                        <div class="form-control">
                            {mass}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>