<script setup>
import { computed, ref, useTemplateRef, reactive } from 'vue'
import Upload from './Upload.vue'

const steps = ref([
    {
        title: '上传图片',
        description: '上传诊断信息图'
    },
    {
        title: '分析过程图',
        description: '处理分析过程的图像'
    },
    {
        title: '诊断结果',
        description: '病症类型以及诊断信息',
    },
    {
        title: '治疗建议',
        description: '提供患者的治疗建议'
    }
])

const currentStep = ref(0)

const okText = computed(() => {
    switch (currentStep.value) {
        case 0:
            return '开始诊断'
        case 1:
            return '查看诊断结果'
        case 2:
            return '查看治疗建议'
        default:
            return '完成'
    }
})

const cancelText = computed(() => {
    if (currentStep.value === 0) {
        return '取消'
    } else {
        return '上一步'
    }
})

const submitLoading = ref(false)
const visible = defineModel()
function handleOk() {
    if (currentStep.value > 2) {
        visible.value = false
        return
    }
    ++currentStep.value
}

function cancel(e) {
    e.preventDefault();
    if (currentStep.value < 1) {
        visible.value = false
        return
    }
    currentStep.value--
}

const formModel = reactive({
    fileList: []
})

const formRef = useTemplateRef('formRef')

const EyeDiseaseTypeMap = reactive({
    dr: true,
    glaucoma: true,
    cataract: true,
    amd: true,
    hp: true,
    myopia: true
})
const result = ref([{
    EyeDiseaseTypeList: ['dr', 'glaucoma', 'cataract', 'amd', 'hp', 'myopia'], // 图一的诊断包含类型
    processImg: ['https://aliyuncdn.antdv.com/vue.png', 'https://aliyuncdn.antdv.com/vue.png'] // 图一的过程图
},
{
    EyeDiseaseTypeList: ['dr', 'glaucoma', 'cataract', 'amd', 'hp', 'myopia'], // 图二的诊断包含类型
    processImg: ['https://aliyuncdn.antdv.com/logo.png', 'https://aliyuncdn.antdv.com/logo.png'] // 图二的过程图
}])

</script>
<template>
    <a-modal v-model:open="visible" title="眼疾诊断" @ok="handleOk" :okText="okText" :destroyOnClose="false"
        @cancel.prevent="cancel" :cancelText="cancelText">
        <div class="my-6">
            <a-steps :current="currentStep" :items="steps"></a-steps>
        </div>
        <div class="mt-6">
            <a-form v-if="currentStep === 0" :model="formModel" ref="formRef">
                <a-form-item label="诊断图片(可上传多张)">
                    <Upload v-model="fileList" />
                </a-form-item>
            </a-form>
            <div v-else v-for="(item, index) in result" :key="index">
                <div v-if="currentStep === 1">
                    <a-typography-title style="color:oklch(0.424 0.199 265.638)" :level="5">图片 {{ index + 1 }}
                        的诊断图片集</a-typography-title>
                    <a-image-preview-group v-for="(processImgItem, i) in item.processImg" :key="i">
                        <a-image :width="200" :src="processImgItem" />
                    </a-image-preview-group>
                </div>

                <div v-else-if="currentStep === 2">
                    <div style="background-color: oklch(0.97 0.014 254.604); padding: 20px" class="my-6">
                        <a-typography-title style="margin-bottom: 24px;color:oklch(0.424 0.199 265.638)" :level="5">图片
                            {{ index + 1 }} 的诊断结果</a-typography-title>
                        <a-row :gutter="[16, 32]">
                            <a-col :span="8" v-if="index === 0">
                                <a-card title="糖尿病视网膜病变 (Diabetic Retinopathy, DR)" :bordered="false">
                                    <p>糖尿病视网膜病变是糖尿病患者常见的眼部并发症，是由于长期高血糖引起视网膜血管受损，导致视力丧失。糖尿病视网膜病变通常分为非增殖性和增殖性两期。非增殖性阶段，血管损伤可能导致视网膜出现微小出血和水肿；而增殖性阶段，视网膜血管严重堵塞，导致新生血管的形成，容易引起视网膜出血、脱落，甚至失明。
                                        早期诊断可以避免病情进一步发展，及时干预和治疗（如激光治疗或抗VEGF药物）可以有效控制病情，保护视力。通过眼底图像的自动化识别技术，能够在无症状阶段发现视网膜微血管病变，为糖尿病患者提供定期筛查和早期治疗的机会。
                                    </p>
                                </a-card>
                            </a-col>
                            <a-col :span="8" v-if="index === 0">
                                <a-card title="青光眼 (Glaucoma)" :bordered="false">
                                    <p>青光眼是一种因眼内压力过高而导致视神经损伤的眼病。常见的青光眼类型包括开角型青光眼和闭角型青光眼。青光眼最显著的特点是视野逐渐丧失，若不及时治疗，可能导致失明。开角型青光眼通常没有明显症状，因此早期难以发现；闭角型青光眼则可能伴随眼痛、头痛、恶心等症状。
                                        早期识别青光眼可以帮助降低眼内压力，从而减少对视神经的损伤。
                                        定期眼压检测和视野检查对青光眼的筛查至关重要，通过自动化影像识别系统可以提高筛查效率，尤其对于高风险人群（如老年人和家族有青光眼病史的人）更为关键。
                                    </p>
                                </a-card>
                            </a-col>
                            <a-col :span="8" v-if="index === 1">
                                <a-card title="白内障 (Cataract)" :bordered="false">
                                    <p>白内障是眼睛晶状体变得浑浊，导致视力逐渐下降的疾病。随着年龄增长，晶状体的蛋白质可能逐渐发生变化，导致其透明度降低，形成白内障。早期症状包括视物模糊、光敏感和夜间视力差。白内障是导致老年人失明的主要原因，但通过手术可以有效治疗。
                                        白内障的早期诊断可以帮助医生和患者决定是否需要手术治疗，延缓其影响。
                                        眼科影像技术（如眼前段照相和光学相干断层扫描）能够帮助识别白内障的早期迹象，监测其发展速度，并为手术时机的选择提供依据。
                                    </p>
                                </a-card>
                            </a-col>
                            <a-col :span="8" v-if="index === 1">
                                <a-card title="年龄相关性黄斑变性 (Age-related Macular Degeneration, AMD)" :bordered="false">
                                    <p>黄斑变性是导致老年人视力丧失的主要原因之一，尤其是影响中央视力。黄斑是视网膜中负责高分辨率视觉的区域，黄斑变性会导致中央视力模糊或失真。黄斑变性分为干性和湿性两种类型，湿性黄斑变性由于新生血管破裂引起出血和视网膜损伤，通常进展较快，干性黄斑变性则较为缓慢。
                                        早期识别黄斑变性能够及时干预，减少视力丧失的风险。湿性黄斑变性如果能够及时通过抗VEGF治疗干预，往往能有效减缓病情的进展。
                                        通过光学相干断层扫描（OCT）和视网膜成像技术，可以快速、准确地识别黄斑变性，特别是在早期阶段。

                                    </p>
                                </a-card>
                            </a-col>
                            <!-- <a-col :span="8">
                            <a-card title="高血压引起的视网膜病变" :bordered="false">
                                <p>高血压可导致眼底血管病变，影响视网膜的血流供应，造成视力损伤。高血压视网膜病变的症状包括眼底出血、视网膜水肿、视网膜动脉硬化等。长期高血压可能导致视网膜缺血、视神经损伤，甚至导致视力丧失。
                                    定期进行眼底检查可以帮助及时发现高血压引起的视网膜损伤，及早采取措施控制血压，防止视力进一步丧失。
                                    眼底影像技术（如眼底照片和OCT扫描）是评估视网膜健康的有效工具，能够帮助医生在高血压患者中及早识别视网膜病变的征兆。

                                </p>
                            </a-card>
                        </a-col>
                        <a-col :span="8">
                            <a-card title="近视 (Myopia)" :bordered="false">
                                <p>近视是眼睛在看远处物体时无法清晰聚焦的状态，通常由于眼球过长或角膜曲率过大所致。近视不仅影响日常生活，而且高度近视可能引发更严重的眼疾，如视网膜脱落、青光眼等。
                                    早期识别近视可以帮助采取适当的矫正措施，如佩戴眼镜或隐形眼镜，减缓近视进展。
                                    高度近视患者更容易发生眼底病变，定期检查可以及时发现这些潜在风险，避免严重后果。
                                    近视的防控对于儿童尤为重要，早期干预措施（如控制用眼、适当户外活动等）能够有效减缓近视的加重。


                                </p>
                            </a-card>
                        </a-col> -->
                        </a-row>
                    </div>

                </div>

                <div v-else-if="currentStep === 3" style="background-color: oklch(0.97 0.014 254.604); padding: 20px" class="my-6">
                    <a-card title="糖尿病视网膜病变 (Diabetic Retinopathy, DR)" :bordered="false">
                        <p>糖尿病视网膜病变是糖尿病患者常见的眼部并发症，是由于长期高血糖引起视网膜血管受损，导致视力丧失。糖尿病视网膜病变通常分为非增殖性和增殖性两期。非增殖性阶段，血管损伤可能导致视网膜出现微小出血和水肿；而增殖性阶段，视网膜血管严重堵塞，导致新生血管的形成，容易引起视网膜出血、脱落，甚至失明。
                            早期诊断可以避免病情进一步发展，及时干预和治疗（如激光治疗或抗VEGF药物）可以有效控制病情，保护视力。通过眼底图像的自动化识别技术，能够在无症状阶段发现视网膜微血管病变，为糖尿病患者提供定期筛查和早期治疗的机会。
                        </p>
                    </a-card>
                </div>
            </div>


        </div>
        <template #footer>
            <a-button @click="cancel">{{ cancelText }}</a-button>
            <a-button type="primary" :loading="submitLoading" @click="handleOk">{{ okText }}</a-button>
        </template>
    </a-modal>

</template>
<style lang="less" scoped>
@import 'tailwindcss';
</style>