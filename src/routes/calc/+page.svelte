<script>
    import Meta from "$lib/Meta.svelte";
    import SvelteMarkdown from 'svelte-markdown'

    const source = `
    !!! info **Table of contents**
    [TOC3]

### 入program教學
編輯Program: \`Mode 6 1 位置 模式\`\n
執行Program: \`Prog 位置\`\n
刪除Program: \`Mode 6 3 位置\`\n
符號輸入: http://webcal.freetzi.com/casio.fx-50FH/specialKey.htm

### Maths program
#### 化簡平方根 (123 bytes) (Comp mode)
\`\`\`python
?→D: D² →A: Ans→B: π Pol(1,0:
Fix 0:While Ans - Rnd( Ans:
X + YRnd( A→C:A - Rnd( A ⇒ Ans⁻¹→A:
Y→X: C→Y: Sci 9:Rnd( BY: Fix 0:
WhileEnd: AnsY→C: 1:While Ans:
Rnd( . 5 - √( C÷Ans→A: C ÷ A²→X:
X - Rnd( X ⇒ Rnd( X + . 5: WhileEnd:
Norm 1:-A┘( D Abs( Y ) ÷ Abs( D◢ X
\`\`\`

> **例題: 化簡 √18**\n
>> 按 \`Prog 1\` 再按 \`√( 18 EXE\` (顯示 \`3\`) \`EXE\` (顯示 \`2\`)\n
>> 所以 √18 = 3√2\n

!!! info 分數開方，sin cos tan x也可

***

#### 找Reference angle β (13 bytes) (Comp mode)
\`\`\`python
?→A：Rec(1,A)：sin-1(Abs(Y◢
\`\`\`
> **例題: tan 330°**\n
>> 按 \`Prog 1\` 再按 \`330 EXE\` (顯示 \`30\`)\n
>> 330° 在Quadrant IV，tan在此為負值\n
>> 因此tan 330° = -tan 30°\n
***
### Chemistry program
#### Balance equation (245 bytes) (Reg, Lin mode)
\`\`\`python
FreqOn:
?→A: ?→B: ?→C: ?→D: ?→X: ?→Y: ?→M:
;AY - BX - 3 DT:
1,AM - XC DT:
A: ?→A: AnsA - XD - 1,0 DT:
BM - YC→X: BA - YD→Y: CA - MD→M:
?→A: ?→B: ?→C: ?→D:
0,AX + Cn+C - BΣxy - Σxy DT:
Abs((DX - CY + BM)┘Σy→X:
Abs(CΣx - AM - DΣxy)┘Σy→C:
Abs(AY + Dn - BΣx)┘Σy→A:
Fix 0: 0→B:X→Y:C→D:A→M:
While (Rnd(Y)=Y) + (Rnd(D)=D) + (Rnd(M)=M)≠3:
B+1→B: XB→Y: CB→D: AB→M:
WhileEnd: Norm 1: Y◢D◢M◢B
\`\`\`

!!! 此program只可於4項之equation使用

> 例題:
> Balance the equation C₇H₆O₂ + O₂ → CO₂ + H₂O
> \`Prog 1 EXE\`
> \`7 EXE 0 EXE 1 EXE 0 EXE\`
>> Number of C in each term
> \`6 EXE 0 EXE 0 EXE 2 EXE\`
>> Number of H in each term
> \`2 EXE 2 EXE 2 EXE 1 EXE\`
>> Number of O in each term
> 顯示2, 15, 14, 6
> 因此答案為 ==2==C₇H₆O₂ + ==15==O₂ → ==14==CO₂ + ==6==H₂O
***
#### Atomic number from percentage by mass (31 bytes, comp mode)
\`\`\`python
?→A: ?→B: ?→C:Fix 1:Rnd(BC÷(A(1-C→M:Norm 1:M
\`\`\`

> 例題:
> The bromide of a metal X has the formula of XBr2 and contains 25.6% by mass of X. Calculate the relative atomic mass of X. (Relative atomic mass: Br = 79.9)\n
>  a / (a + 79.9 * 2) * 100%  = 25.6%\n
>> a = atomic number of X\n
>  \`Prog 1 EXE\`\n
>  \`1 EXE\`\n
>> Number of X in the formula\n
>  \`79.9*2 EXE\`\n
>> Molar mass of the molecule except X\n
>  \`25.6% EXE\`\n
>> Percentage by mass of X\n
> Therefore answer is 55.0\n
    `
</script>

<Meta title="Calculator Program"/>
<div class="container">
    <SvelteMarkdown {source}/>
</div>
