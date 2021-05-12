# [Project] ETH cupcake Visualizer  :cake: :cup_with_straw: 

Reference - [We Bare Bears - Cupcake Job (Preview) Clip 2](https://www.youtube.com/watch?v=2QBRMYxF7Wc&t=34s&ab_channel=CartoonNetworkAustralia)

>點子，有比較大的交易時，甜點（料）可以大一點

5/12
```javascript=
// 料的移動 （依照數量撒料）
// 想使用particle
// 可使用這個雪的範例調整速度+數量
//https://codepen.io/n-sayenko/pen/qOXKVr
// 後來發現這種發射器的效果應該更適合，因為會從一個點發射出來
//https://codepen.io/matteobruni/pen/eYBaGxy
// 但突然又想到發射出來的particle不會停留在蛋糕上面 😨


```
![](https://i.imgur.com/2HcFLzz.png =x300)

5/11
完成了簡單的asset
- 製作料箱asset 
- 限制block最多30個？
- 有幾個block就放幾個杯子蛋糕
- 對第一個加料
    - 移動元素的動畫
        - 料箱移動（將目前第一個要撒的料箱移動到杯子蛋糕上面）
        - 料的移動 （依照數量撒料）
        - 輸送帶移動 （每次加完料，移動一個被子蛋糕的距離）
- 設定網址
- 部署上去
```javascript=
// 料箱移動（將目前第一個要撒的料箱移動到杯子蛋糕上面）
// 或者簡單做只做一個料箱？ 每次都收上去
// 目前這樣寫好像不太對，因為要的話是一整排移動
const ingredientBoxsData = {
    {
        name: 'uniswap',
        amount: 20,
        type: cake,
        position: {x: 10, y: 10}
    },
    {
        name: 'binance',
        amount: 20,
        type: cake,
        position: {x: 10, y: 10}
    },
    ...
}

const renderBoxs = () => {
    const array = []
    for(let i in ingredientBoxsData) {
        array.push(ingredientBoxsData[i])
    }
    
    return array.map(x=> <ingredientBox/>)
}
```

```javascript=
// 輸送帶的移動 （依照數量撒料）

```

```javascript=
// 料箱asset
Uniswap
binance
makerDAO
0x
```

```javascript=
// assets
belt_feather
cupcake

belt
background
```
4/27
想一下整理合約的資料結構
```javascript=
{
    name: '0x',
    contracts: ['...', '...']
}
```

```
{blockHash: "0x238bea3d03150d94fad95e9857867679db35265d0a90ff82346383c1b55a2822", blockNumber: 12317813, from: "0xc6bed363b30DF7F35b601a5547fE56cd31Ec63DA", gas: 500000, gasPrice: "58830000000", …}
blockHash: "0x238bea3d03150d94fad95e9857867679db35265d0a90ff82346383c1b55a2822"
blockNumber: 12317813
from: "0xc6bed363b30DF7F35b601a5547fE56cd31Ec63DA"
gas: 500000
gasPrice: "58830000000"
hash: "0xe2cce4e49e1336ef26c50b1d8c396cf465cb9f148a353c9c1bee7c397b55a3ed"
input: "0xa9059cbb0000000000000000000000003c47eba4bba52943aba63330f32468d4f2d6a6890000000000000000000000000000000000000000000000002bf2ce02ef9a4000"
nonce: 104047
r: "0x1c7e81e577e20b19dc79bc1e73f221523434bc87ed49b5706ae8338b4b3c3048"
s: "0x26e36677467648642f7cf4e3e92097a1e36cb6ae5702ec876f514f1e39ca6896"
to: "0x514910771AF9Ca656af840dff83E8264EcF986CA"
transactionIndex: 17
type: "0x0"
v: "0x1c"
value: "0"
```

4/26
確認區塊的顯示正確，可以開始思考畫面呈現的部分
比如拿到完整的區塊後，才開始放料，這樣會比較順
有時間差，應該不會是大家太在意的地方
這個專案注重在趣味性

4/25
append到重複的block
用for loop檢查可能會太沒效率
需要用比較有效率的資料結構
但應該可以先限縮在比如10個block之內

為什麼會有重複的block？
推測因為有的block transactions比較少
就先回來了

4/23
還是沒辦法如預期的render出來
邏輯：
1.先拿到最新一個區塊的內容
2.做source


4/10
今天可以把區塊render出來

4/9
沒變的原因是因為
setInterval會使用schedule排程的時候的值
必須使用當下的值
https://github.com/facebook/react/issues/14010
https://codesandbox.io/s/2190jjw6op?file=/src/index.js:126-131
```
const countRef = useRef(count);
countRef.current = count;

```


4/3
先將結構改成新的
問題，setIntreval帶進去的param都沒變

3/31
改變state應該要寫成
source一邊改變時，一邊setState，這樣畫面才會rerender

1. initBlock
    - 先存transactions跟blockNumber
    - 製作source
    - 存該source到該block
2. getLatestBlocks

```
// blockInfo
{
difficulty: "5948644842225814", extraData: "0xe4b883e5bda9e7a59ee4bb99e9b1bc080421", gasLimit: 12451120, gasUsed: 12449193, hash: "0x1f58411fd98374b9a31fb42b51a1136eec2c9287eb9a18695d3f260ac5ab5eb6", …}
difficulty: "5948644842225814"
extraData: "0xe4b883e5bda9e7a59ee4bb99e9b1bc080421"
gasLimit: 12451120
gasUsed: 12449193
hash: "0x1f58411fd98374b9a31fb42b51a1136eec2c9287eb9a18695d3f260ac5ab5eb6"
logsBloom: "0x9366d4a27c87a0ab158de74c83add21f7dc6c58ae410a00b163fac50fda739211c8c555221c7307c6680dbc81a2ae99b5fa82eb40b9faf844eeedf8022fc24c54e48bc670abef628c8db249fbba58ffcb9d9e214575d3f1412d3cd50865123931d5030c2ca3080a207857706c10abb578366ae74189435e47430cd96647ac6641d23daef3bd01d1cd5da6a450da49e0ae191cf974bdc82fb3329414f0c9b01736764c686554e6d9fa7c2ca907a5af04aeb58704981c881a87282b518f10742cc67f6e05fe5e407c66920a8d1155894046bd0171b06c067f45bb524eee56c763c587c380410b7008ae7adccc47b977edc9c688733c2e430554c2c33148d421c2b"
miner: "0x829BD824B016326A401d083B33D092293333A830"
mixHash: "0x992d2c160b77af68092cfd66104c325a2d5974ccf33ba8d973db62ac76ddeeba"
nonce: "0xe2096771b3d5d1ed"
number: 12107741
parentHash: "0xe5a62e4696a02d66a83c843de47827ab0d523d8db6c6b3b70807f01483847b44"
receiptsRoot: "0xa5bbc5706a3a0eb92d0b8d206ee04640d5a1d518ddecc9486263577830bd4201"
sha3Uncles: "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347"
size: 51199
stateRoot: "0x46d0aadec5e2963db90d70cf740f6b952c092da8f7cff76d873fbbd0a05578f1"
timestamp: 1616670406
totalDifficulty: "22444365373136996744073"
transactions: (242) ["0x22a9e8bd25b104a4d38a12ac493d5d292ce3a182c4ab2859cf01e56db9243ad5", "0xd026cd91b0afde8f97ce151b28ca1bd8f3330ff6a2ed78a71c67bfd9a13cc7c7", "0x76d2e7c155ff3a821446e8987bb44f32e27ab3b39387c2ff8f24e15a7ab2637b", "0x89c3986cd254b1a556c91be55ddc8e055e0c05723e73e67041df854ec5767791", "0x6e2af846129619f0b1129e3ce028a73796d61fe491c5ad71041ecf071e629bfa", "0x9ae38fcdf2a74fd5b1943c5475945cb50b6a6e119080531e259c01e328c4b2c9", "0x676ec13b374500799fa569efcff29ee10307d769909c236f712438971e7a4d58", "0xb0e49795ec872b268f56efd613b4c35c7c33588fa74e0568ef1c41de35a66cab", "0x5a20476f82e2203aef8229fc95466ae51cd1d8c894d6a092cc8f95a82eb0e949", "0xed9ba7fd3f7c67da8ce7358728df867fd1a2469fd02523f29e8fe023f0d87eb3", "0xf9bc8a51d2169316eda42c121c196806fb62ced79200ed453c8a9cb691b79acb", "0xb46dd451e4f77e765f2c6f663b114a4647f6af8e46e6678e2bbb408441003b8c", "0x447b0e8bfe80ab1c9692e3bbb4664fa9ce6757d19e27dab49703023e25a1a07f", "0xe12bdc06984235e0a736fb97b2f2cf03268f17b0152a463871b424655a601be9", "0x87ff775ee04e0ca34145c7de1d928429221b0dbf89722e14cf6cca11157bd420", "0x21dfc7b78bab58590ab8e4f251bce660957f4a110fbc7056825be36f54304dee", "0xe80068e4c280f13980722f7711d2ecc9283f3a04ff507fbd17243ec2966d036a", "0x1327d848c6c9c11b458b1c26ef3b54695133cb4b3c9375368be56c6c58e03d44", "0x11cd4989ff2c3f79876496fbdc2f0c38eb3be5a6573e28671dab68ea252d8825", "0xac3141c8006b8488d40a860c5db8b8604781abbd50b1857e6041b7fe8a9ebdc1", "0xa1a5f75e002e327a8e47ab6bd9b4a0f0294488148b69eb1303de982fb75200d0", "0x9794420b328b9ea9c038836d1abca56db319e25f4141b01ef140c56a7bd06a85", "0x57d534d6fcb6089b86c317cae8cc966091e94732ed6bbd83572a99d1cac88091", "0xa0601319e86a727a5898a845e39fb5c61c4902b65fba4629171c72ea153bd2d1", "0xc9805c11528dd308ac635b8d63b582f5bb78ab319542fa932aa888aa471e631a", "0x90b99dd6e7801fa895ad4356fd2cfd15c264dd83bcc45872b2e68c7f74bae5ab", "0x8d4740e1216f81928c10c4a2e2b7e4048c1ca131aa49a1b40076044fdbc51ffb", "0x90313c9585c0073154e2a6bfc8a4f28916fa185acbde1a6716cdac381c145379", "0xc9234f2444b12ea53f5e3716a2d69ebf4cec31e0f47315993792b3d02870d9b5", "0xc40c26cc0f3253a6fb7f314770bae0995c3d207048b273a1117bb89087005577", "0x612e90223334f927d8b1b0a5b06f8820ccc14f31ae3f016c5438970a087046b3", "0x2a051a25e0ed994111dbc5cb6f1c5cb5f1bb4eb76fe6d95ded0c6cbe53281023", "0x5a29f9abb1ce90d3f4b3463944f75c45442b2b7789391765a1f2efade08bc23f", "0x0ba1f03dd2d3576914d34819f0dce1dca51f199425e2e0fed9990cd51fbe9abf", "0xc0a333b6046274ecb955bfb9115216fc7959c6a0eaf9622448d0f7e757ea81a2", "0x1b59005c71a2983fca72ec36c7b83f4e386a6d368dd33b4fe5ce0648223e330a", "0x85e1321ce1b605abce8e41b74220011fbfb901add790fac3bb8c8bd32c95a4e9", "0x16ad30d19be69600e0b54e52dbf5b2fd096cfbd4b6552dd480b356d23a85ff9e", "0x7095c4a272e1aa54d78c92b9a069291ea6d573e63f295433989154ee5d77c521", "0x8b4040a232016cc99e6c6b7369df16f2e48c625e2a2279bb4a0488f5a128ca43", "0x3faf834873d16eb8f494e4ab8f92ec99edf9c47f51bd7b4fa06fed5c43c1e70a", "0x9ed1e3fccdf6c4706d8c6d3eda62d11f32516481a4a52b264f6f13170a2cfab9", "0x95b4c664cf450f3a004c002b6b6544c8d5bc49aefce2cd2e2cc8a99223769bbd", "0x6b8b165d10bc665bd4cf5d5c80def3c8b4d5480d25b85b003dc6120593b5c810", "0x44f58989f1cb012a8075ed7c280eb957270fbc1d8cd9288e7a8c69bd36a8b2c3", "0xa0e7422ec798e7b91606649b8f1c3d4cd40c93d3858feb5dc708d4cf047bbd6b", "0x1d4e01236c28ecd1b160a322a7f4e3b56288e054c333bc98a4d521ff01a1e50e", "0x48a5c59b2a6b9fb74fe3a6051ac20f3c5616f623853ce6be6ff1f5a50f7a5196", "0x366458c04b5b384396953d03605daa6ff5463c886036db390930da30b2ab5459", "0xfba1b9b59d699590d320274f9eff00c906ea50a77aff70603a57d359c13857ac", "0xab15f5c6ab8043cd132a6ea814bcd614007f0e1510a6731bc053e9293014092e", "0xcf4dedc7dfcd0d19a84cb198abe33e7c055d30714f5a056e174b1eeb9d934eb4", "0x4e75bb182e4aa1849bf4797c980dd388e055d85144b6cd42f7ee872ff039340d", "0x98be89c26df7796b0c8ebdcdcd941dce0a3f341c239ad3b5547e725838b4d86b", "0x0e284b5e8cf4f016bbaa4a28dddea10306c6c1469b2d64a8f4f1d911b23b7267", "0x38bc96e3c555b5e9d62e5bcf29321e1665a1d37e76ec72a8d373fd2f7670ddb3", "0x17f9328bad71552af0c6a82335ed75a202f773fc621cd23396f36df22e50641f", "0xd2a07ca2f1b6922180d2d06ea719480d40b82d0ef2ad2de3669eb5b1337de125", "0xea5fb16b9ad30dbc3c122138b82f39bd816181680746c34f85d12687dc49eb63", "0x050207c98bd8dee84e3c173c20bd066cc8a736992b3619b061dfd1e039469e0c", "0x20c5bb32ea30a44c55c09a38987fa7af79a18fb70ef6537ace0f7cbde2aa2035", "0xf06713cf49ec5533ee854792a04959b10bf6005bb9db4dbf174e7fb1febaad9d", "0x338268798a6c67ea1ea27139825d253338a8a795cdaf75b7c31df000c77c08a4", "0x3161869b69d748a212653ab983ce48da16f671f13fd9077589dd25b62e2b88ed", "0x74c3e4635c065a65f97d4278023571302fc208ff8b50ffc5c82ca8f4eecfc773", "0xab91000bc3646110c115905993af8c183ef17b70c7d50d519899325b0b0f4770", "0x34d8773331016cd12155e62a0cff1a88776fb115b01630cce357b6fea6102f55", "0xfb271ac0e60d8c75b365266d1c194f9e57bb2859352c038de2632e8e4b919c79", "0x8d0c332f39e2bed2f8a8f986adaf582d183c4a199de5a6099d58b4d863307a78", "0x81af7bc98fc08938e0844fbbcce7f2a8332cc1ef73ca291ee6cfcae84fc775e7", "0x7febbaaba6f7b30e675416909b937ba86af2443da7e81dfc5a095c214f08dd2f", "0xdfd48c45194fa7a3d6e8c5979440e6333e3eebc22643a8c421202bb975253d87", "0xf3d9a563e42388a02e11c29fdb89e38cbcf14950bb184d0a071e9fea84d341f8", "0x69d0580ddb66cb901a7da42ba139d36fdc5febce1d3b9c1af47b59182a495e6d", "0xa797e7fc20f06bebea0eb2541a50d9c55bdbdc6a7d5cd5206194da68ec1acefc", "0x8c677ece412689721a704169392c7d7a966a0db291ee23548f499e1bbb7c0e1e", "0x851e9ed4cd4ef2c938892693b78a46a10e73e14ccc877bcd4745cb8af1a75e16", "0x29b5c1c72910af52630fbbbd9e63367c192f8c0bd0affbbd26c6a50a5e757487", "0x1f328116193bdb2bef33ecefafc9a34f4f1025ef67a0d7103b5cac8ad169e2db", "0x53a96e62d4bc2370f3ab31b1a60098c640a0267eaee6ad25f837fcade343db21", "0xa285c8420c1a65d846ba7a5331a8c50ba6b95c1de3aadd7443cec5a39b51e85a", "0x4eb85b91aeb940843b755cdee783ef236835743b40a1299435a24422a8fe6038", "0xee8c58a3f6daf145ee2558a4f61d6f36626f70eee91bf2a6ea8068c732210f11", "0x2e14b4856a3f3683144fcdae15efaceb08537b38322c8c9f23adae2a35b5fcbe", "0x7966fdea595e63b444cffcd75d7f448f47fb143c643915dc69cc74515731d386", "0xdf88f5ab72f9849f09e84140fd80caaa87738cd9f1c5cee79fff4486829fabd9", "0xfebe1c7ca9a5688f5669bf12137aa457c0e54fbcc5ef5447feb493f7f12c4182", "0x1c0435f644fcf26db4f06515003075dfdb81cf29e11d84e0e7ce9b41e5c381e8", "0x4e94c8acf0c1dd3aa5cfa2e7fd32acadd86dda5db8a5c9f6988578bccd16bcc8", "0x1653f228d340c3edbeb52d27d4d5c9e5222acfbcc4947710958b9d55433de9b3", "0x1c27f5793c6558d8c1a98c6b2973e2237cb7b7627d65ad5be9264d53f7df5b74", "0xf2a23fc66a19755ba9277fcdab31905d94e411b61fcbe40ccd9710bdb036e635", "0xd9ed05670ac84f1daf8605a2fad101afc0bb45dbaf300fcd07fbedb391eb9ba0", "0x1a1edea50d66f1167335ac5d39f18c97e022500271cdad9e25e95647c9a6171f", "0xd05e7f1e1ffef26f947739e8dd29e2c9f7c64d2520f767278bb7c459d0b383ea", "0x20a9b077f48a3e9bda4f20f2b5bc05bde1c154b90139f9fe1dc8a78be2b81415", "0x4e81100582395f3cbeb3d1ab785e6673fff8b6412421bd40740023a978d523b7", "0x5c4536e73187372c873275493c51fd3b61bbccc4ef57cc4803498344a960c24f", "0x58982f84cce25c19e2af68cd2172e63b2047c5e5b31e49a70339251d0a93f980", "0x0882fcf0ca6e129c12db696b9ec4e699af95ebf70e2ef525f1d799c9726fee32", …]
transactionsRoot: "0x79dd82e79aba33afb667da43ab4c7a796ef89d4407aa830d796bba5dd5ee0b43"
uncles: []
```

3/29
資料結構應該要改
```
data = [
  {
    blockNumber: '123445',
    transaction: {...},
    source: {...}
  }
]
```

3/19
render數字出來後，
1.應該做成每個block的數字不同
2.request的數量看起來還是不對

3/17
拿資料的地方寫錯了，寫成每次都拿全部block的transaction
應該只要拿最後一個block

3/15
```
一天24小時
*60 = 1440 mins
*60 = 86400 秒

每18秒抓一個新的block = 86400/18 = 5760
每個block有100-300個transaction
5760*400 = 1728,000 大於上限
或是
86400/18.5*210
```

input
```
// 待填..
```
output
```
// 待填..
```
constrain

3/7
問Domi：
每一秒可以request一次
input
output
constrain

3/5
問Quincy的意見，兩種想法：
目前傾向不架設結點，先不用考慮太多事情
- 不架設結點：
Quincy說，如果只是想要呈現來源的話
作為一個使用者，他並不關心還沒有成型的區塊
建議一開始先用已上錬資料，就不用考慮自己架節點
至於infura的上限
必須做的是如果最大化這十萬筆？最終一定要做後端寫一個service，不可能一直用前端query

- 架設結點：
他的家裡自己有架結點
要考慮的是流量，request量等
因為以太每十五秒就要sync一次節點，會有一筆固定費用

3/3
Anton說：
這是自己假節點
他的資訊是mempool的資訊
那些infura沒有

所以可能要自己架節點？
https://ethereum.org/en/developers/docs/nodes-and-clients/

改完寫法後算是有達到想要的需求，但：
1. api call的限制有辦法解決嗎？
2. 同一個block來的transaction好像很容易是同一個來源的，有點沒辦法達到想要的效果

每加完一個block應該要reset數字

3/2
```
const [counts, setCounts] = useState({})
```
...cache, state的規劃在react component裡弄得不太好
現在已經亂掉了
function要放在component裡面嗎？
state要傳進去function裡嗎？還是用global scope？
要看一下把hook包在function裡面的寫法
(先用global scope這種比較差的方法解決了)


2/26
想法：
將每個抓到的transaction的blockin.transaction的hash拿去查to
```javascript=
// 回一個promise
// const aa = web3.eth.getTransaction(transactionHash [, callback])

const SOURCE_ADDRESSES = {
- uniswap 
0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
0xf164fC0Ec4E93095b804a4795bBe1e041497b92a
- binance
0xD551234Ae421e3BCBA99A0Da6d736074f22192FF
- other contract 
- Tether 
0xdac17f958d2ee523a2206206994597c13d831ec7
- dYdX
0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e
- Compound
0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5
- Kraken 
0xfa52274dd61e1643d2205169732f29114bc240b3
- makerDAO
0x6B175474E89094C44Da98b954EedeAC495271d0F
}

const SOURCE_ADDRESSED_ARRAY = [
0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
0xf164fC0Ec4E93095b804a4795bBe1e041497b92a
- binance
0xD551234Ae421e3BCBA99A0Da6d736074f22192FF
- other contract 
- Tether 
0xdac17f958d2ee523a2206206994597c13d831ec7
- dYdX
0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e
- Compound
0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5
- Kraken 
0xfa52274dd61e1643d2205169732f29114bc240b3
- makerDAO
0x6B175474E89094C44Da98b954EedeAC495271d0F
]

for (let i of transactions) {
    const transaction = await web3.eth.getTransaction(i)
    if(SOURCE_ADDRESSED_ARRAY.includes(transaction.to) {
        // count++
    })
}
```

2/24
必須抓到transaction 是從哪個resource？ -> find a proper list from defis -> but it doesn't really need to show all the defis. -> list the top 10 

### **TODO** 應該要抓的是pending transaction！！ 

transaction action 
- uniswap 
0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D
0x5C69bEe701ef814a2B6a3EDD4B1652CB9cc5aA6f
0xf164fC0Ec4E93095b804a4795bBe1e041497b92a
- binance
0xD551234Ae421e3BCBA99A0Da6d736074f22192FF
- other contract 
- Tether 
0xdac17f958d2ee523a2206206994597c13d831ec7
- dYdX
0x1E0447b19BB6EcFdAe1e4AE1694b0C3659614e4e
- Compound
0x4Ddc2D193948926D02f9B1fE9e1daa0718270ED5
- Kraken 
0xfa52274dd61e1643d2205169732f29114bc240b3
- makerDAO
0x6B175474E89094C44Da98b954EedeAC495271d0F

2/23
Repo Opened!!
https://github.com/noraliucode/eth-cupcake-visualizer

A fun way to do ethereum blockchain data visualization.

Todo: 
1. Hover and shows block information (blocknumber etc.)
2. Create assets
    - 空的紙杯
    // - 每個交易所準備不同的料（先準備五個就好，然後有一個其他）
    - beta版可以先做兩種料就好，擠奶油的動畫，跟餅乾（logo形狀的餅乾，軟糖等）
3. code：
    - 紙杯+輸送帶移動的css animation 
    - 改成ts
    - 管子的animation 
    - 奶油的animation 
    - 擠出東西的箱子


2/21

- 圖片可以用we bear bear cupcake
- N = between 10 to 20 seconds 
    
![](https://i.imgur.com/jdAQ0fw.png)
![](https://i.imgur.com/TQVgJZT.jpg)


2/18
- get latest 10 block information 
- https://ethereum.stackexchange.com/questions/1587/how-can-i-get-the-data-of-the-latest-10-blocks-via-web3-js
```
for (var i=0; i < 10; i++) {
  console.log(web3.eth.getBlock(web3.eth.blockNumber - i));
}
```
- Fetch data every N second? 
，用web3確定能夠get到區塊資訊，要再看看：
    - 每Ｎ秒拉一次，看看有沒有比目前高的區塊
    - 如果有，區塊新長出一塊
    - hover有更詳細資訊
    - 點擊可到etherscan
    - 背景是月球
    - 有時間再看一下其他兩個都有哪些功能，哪些資訊



