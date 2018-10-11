/**
 * 彩种
 */
import shuangseqiu from "./shuangseqiu";
import jczq from "./jczq";
import fc3d from "./fc3d";
import pai3 from "./pai3";

const caizhong = [
    shuangseqiu,
    jczq,
];

caizhong.push(...fc3d);
caizhong.push(...pai3);

export default caizhong;
