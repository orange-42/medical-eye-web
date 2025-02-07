<template>
  <div class="medical-data-analysis">
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-4 sticky top-0 z-50"
    >
      <nav class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">医学大数据分析</h1>
        <div class="hidden md:flex space-x-4">
          <a
            v-for="section in sections"
            :key="section.id"
            :href="`#${section.id}`"
            class="hover:text-blue-200 transition duration-300"
          >
            {{ section.title }}
          </a>
        </div>
        <button @click="toggleMenu" class="md:hidden">
          <MenuIcon />
        </button>
      </nav>
      <div v-if="isMenuOpen" class="md:hidden mt-4">
        <a
          v-for="section in sections"
          :key="section.id"
          :href="`#${section.id}`"
          class="block py-2 hover:text-blue-200"
          @click="isMenuOpen = false"
        >
          {{ section.title }}
        </a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Hero Section with Carousel -->
      <section class="mb-16">
        <div class="relative h-96 overflow-hidden rounded-lg shadow-xl">
          <div class="absolute inset-0">
            <transition-group name="fade" tag="div">
              <div
                v-for="(slide, index) in carouselSlides"
                :key="slide.id"
                v-show="currentSlide === index"
                class="absolute inset-0"
              >
                <img
                  :src="slide.image"
                  :alt="slide.alt"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
                >
                  <div class="text-center">
                    <h2 class="text-4xl font-bold text-white mb-4">
                      {{ slide.title }}
                    </h2>
                    <p class="text-xl text-white mb-8">
                      {{ slide.description }}
                    </p>
                    <a
                      :href="slide.link"
                      class="bg-blue-600 text-white font-bold py-2 px-4 rounded-full hover:bg-blue-700 transition duration-300"
                    >
                      了解更多
                    </a>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
          <button
            @click="prevSlide"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
          >
            <ChevronLeftIcon class="h-6 w-6 text-blue-600" />
          </button>
          <button
            @click="nextSlide"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hover:bg-opacity-75 transition duration-300"
          >
            <ChevronRightIcon class="h-6 w-6 text-blue-600" />
          </button>
        </div>
      </section>

      <!-- Introduction Section -->
      <section id="introduction" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">
          双目彩色眼底图像数据预处理的概述与简介
        </h2>
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <p class="mb-4">
            眼底图像作为眼科疾病诊断的重要工具，能够提供丰富的视网膜结构信息，对于早期发现和诊断眼疾具有至关重要的作用。随着深度学习技术在医学影像领域的广泛应用，眼底图像的自动化分析成为眼科疾病早期检测和分类的关键技术之一。
          </p>
          <p class="mb-4">
            然而，由于眼底图像的复杂性及其多样性，数据预处理在确保模型性能和泛化能力方面扮演着重要角色。本研究基于双目彩色眼底图像数据集，进行了一系列的数据预处理工作，旨在为后续的多标签图像分类任务提供高质量的输入数据。
          </p>
        </div>
      </section>

      <!-- Dataset Overview Section -->
      <section id="dataset" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">数据集概述</h2>
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <p class="mb-4">
            本研究使用的数据集包含了5770张双目彩色眼底图像，每张图像来源于真实的临床病例，并涵盖了以下六种常见眼疾的病例：
          </p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div
              v-for="disease in eyeDiseases"
              :key="disease.name"
              class="bg-blue-100 p-4 rounded-lg text-center"
            >
              <h3 class="font-semibold text-blue-800">{{ disease.name }}</h3>
            </div>
          </div>
          <p class="mt-4">
            每张图像至少包含一种眼疾的病变区域，部分图像可能同时呈现多个眼疾，因此本数据集被定义为多标签图像分类任务。
          </p>
        </div>
      </section>

      <!-- Data Preprocessing Section -->
      <section id="preprocessing" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">数据预处理</h2>
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <h3 class="text-xl font-semibold mb-4">数据预处理的重要性</h3>
          <p class="mb-4">
            数据预处理是图像分析中的关键步骤，尤其对于医学图像任务而言，它直接影响到模型的训练效率和准确性。
          </p>

          <h3 class="text-xl font-semibold mb-4">
            双目彩色眼底图像的预处理流程
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              v-for="(step, index) in preprocessingSteps"
              :key="index"
              class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition duration-300"
            >
              <h4 class="font-semibold text-blue-700 mb-2">{{ step.title }}</h4>
              <p>{{ step.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Eye Diseases Section -->
      <section id="diseases" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">常见眼疾介绍</h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div
            v-for="disease in eyeDiseases"
            :key="disease.name"
            class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
          >
            <h3 class="text-2xl font-semibold mb-4 text-blue-600">
              {{ disease.name }}
            </h3>
            <p class="mb-4">{{ disease.description }}</p>
            <h4 class="font-semibold mb-2">症状：</h4>
            <ul class="list-disc list-inside mb-4">
              <li v-for="symptom in disease.symptoms" :key="symptom">
                {{ symptom }}
              </li>
            </ul>
            <p><strong>诊断与治疗：</strong> {{ disease.diagnosis }}</p>
          </div>
        </div>
      </section>

      <!-- Model Introduction Section -->
      <section id="model" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">眼疾识别模型概述</h2>
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <p class="mb-4">
            眼疾识别模型采用ResNet50作为基础网络架构，借助其深度残差学习机制，在处理眼部影像时能够有效提取复杂的特征信息。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div
              v-for="(feature, index) in resnetFeatures"
              :key="index"
              class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition duration-300"
            >
              <h4 class="font-semibold text-blue-700 mb-2">
                {{ feature.title }}
              </h4>
              <p>{{ feature.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- Parameter Tuning Section -->
      <section id="parameter-tuning" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">
          模型的参数调优过程
        </h2>
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <p class="mb-4">
            在眼疾识别任务中，模型的性能高度依赖于超参数的选择。为了最大化模型的分类效果，合理的超参数调优过程是至关重要的。
          </p>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <div
              v-for="(param, index) in tuningParams"
              :key="index"
              class="bg-blue-50 p-4 rounded-lg hover:shadow-md transition duration-300"
            >
              <h4 class="font-semibold text-blue-700 mb-2">
                {{ param.title }}
              </h4>
              <p>{{ param.description }}</p>
            </div>
          </div>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">关于我们</h2>
        <div
          class="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300"
        >
          <p class="mb-4">
            我们是一个致力于利用人工智能技术改善医疗诊断的研究团队。我们的目标是通过开发先进的图像分析算法，帮助医生更早、更准确地诊断眼科疾病。
          </p>
          <p class="mb-4">
            通过结合深度学习技术和医学专业知识，我们旨在为眼科医生提供强大的辅助诊断工具，提高诊断的准确性和效率。
          </p>
          <div class="mt-6 bg-blue-50 p-4 rounded-lg">
            <h3 class="font-semibold text-blue-700 mb-2">联系我们</h3>
            <p><strong>邮箱：</strong> contact@medicaldataanalysis.com</p>
            <p><strong>电话：</strong> +86 123 4567 8900</p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer class="bg-gray-800 text-white p-4 mt-8">
      <div class="container mx-auto text-center">
        <p>&copy; 2023 医学大数据分析团队. 保留所有权利。</p>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { MenuIcon, ChevronLeftIcon, ChevronRightIcon } from 'lucide-vue-next'

const isMenuOpen = ref(false)
const currentSlide = ref(0)

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value
}

const sections = [
  { id: 'introduction', title: '简介' },
  { id: 'dataset', title: '数据集' },
  { id: 'preprocessing', title: '数据预处理' },
  { id: 'diseases', title: '眼疾介绍' },
  { id: 'model', title: '模型介绍' },
  { id: 'parameter-tuning', title: '参数调优' },
  { id: 'about', title: '关于我们' }
]

const carouselSlides = [
  {
    id: 1,
    title: '眼底图像分析革新',
    description: '利用深度学习技术，实现眼底图像的自动化分析',
    image: '/placeholder.svg?height=400&width=800',
    alt: '眼底图像分析示意图',
    link: '#introduction'
  },
  {
    id: 2,
    title: '多种眼疾早期检测',
    description: '准确识别多种常见眼疾，助力早期诊断',
    image: '/placeholder.svg?height=400&width=800',
    alt: '眼疾检测流程图',
    link: '#diseases'
  },
  {
    id: 3,
    title: '先进的深度学习模型',
    description: '基于ResNet50的眼疾识别模型',
    image: '/placeholder.svg?height=400&width=800',
    alt: '深度学习模型架构图',
    link: '#model'
  }
]

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % carouselSlides.length
}

const prevSlide = () => {
  currentSlide.value =
    (currentSlide.value - 1 + carouselSlides.length) % carouselSlides.length
}

let intervalId = null

onMounted(() => {
  intervalId = setInterval(nextSlide, 5000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})

const eyeDiseases = [
  {
    name: '糖尿病视网膜病变',
    description:
      '糖尿病患者常见的眼部并发症，由长期高血糖引起视网膜血管受损，导致视力丧失。',
    symptoms: ['视网膜微小出血', '水肿', '新生血管形成'],
    diagnosis:
      '早期诊断可以避免病情进一步发展，及时干预和治疗（如激光治疗或抗VEGF药物）可以有效控制病情，保护视力。'
  },
  {
    name: '青光眼',
    description: '因眼内压力过高而导致视神经损伤的眼病。',
    symptoms: ['视野逐渐丧失', '眼痛', '头痛'],
    diagnosis:
      '早期识别青光眼可以帮助降低眼内压力，从而减少对视神经的损伤。定期眼压检测和视野检查对青光眼的筛查至关重要。'
  },
  {
    name: '白内障',
    description: '眼睛晶状体变得浑浊，导致视力逐渐下降的疾病。',
    symptoms: ['视物模糊', '光敏感', '夜间视力差'],
    diagnosis:
      '白内障的早期诊断可以帮助医生和患者决定是否需要手术治疗，延缓其影响。'
  },
  {
    name: '年龄相关性黄斑变性',
    description: '影响中央视力的主要原因之一，特别是在老年人群中。',
    symptoms: ['中央视力模糊或失真', '视物变形', '中心暗点'],
    diagnosis:
      '早期识别黄斑变性能够及时干预，减少视力丧失的风险。湿性黄斑变性如果能够及时通过抗VEGF治疗干预，往往能有效减缓病情的进展。'
  },
  {
    name: '高血压引起的视网膜病变',
    description: '高血压可导致眼底血管病变，影响视网膜的血流供应。',
    symptoms: ['眼底出血', '视网膜水肿', '视网膜动脉硬化'],
    diagnosis:
      '定期进行眼底检查可以帮助及时发现高血压引起的视网膜损伤，及早采取措施控制血压，防止视力进一步丧失。'
  },
  {
    name: '近视',
    description: '眼睛在看远处物体时无法清晰聚焦的状态。',
    symptoms: ['远处物体看不清', '眼睛疲劳', '头痛'],
    diagnosis:
      '早期识别近视可以帮助采取适当的矫正措施，如佩戴眼镜或隐形眼镜，减缓近视进展。高度近视患者更容易发生眼底病变，定期检查可以及时发现这些潜在风险。'
  }
]

const preprocessingSteps = [
  {
    title: '图像去噪与增强',
    description:
      '使用去噪算法（如高斯滤波、中值滤波等）对图像进行处理，并进行对比度增强和亮度调整。'
  },
  {
    title: '图像标准化与归一化',
    description:
      '将图像像素值进行标准化（如减去均值，除以标准差）或归一化（将像素值缩放到0到1之间）。'
  },
  {
    title: '图像裁剪与重采样',
    description: '将图像统一缩放到固定大小224×224，并进行中心裁剪或边缘裁剪。'
  },
  {
    title: '数据增强',
    description: '进行旋转、平移、缩放、翻转等操作，增加训练数据的多样性。'
  },
  {
    title: '多标签处理',
    description: '将每张图像的标签处理为二进制向量，表示图像是否包含某一眼疾。'
  }
]

const resnetFeatures = [
  {
    title: '残差连接',
    description: '通过跳跃连接解决深层网络的梯度消失问题，提高训练效率。'
  },
  {
    title: '深度特征提取',
    description:
      '50层深度网络能够提取复杂的图像特征，适用于眼底图像的细节分析。'
  },
  {
    title: '全局平均池化',
    description: '减少过拟合风险，提高模型的泛化能力。'
  },
  {
    title: '多尺度特征学习',
    description: '通过不同大小的卷积核，捕捉眼底图像中的多尺度特征。'
  }
]

const tuningParams = [
  {
    title: '学习率调优',
    description:
      '采用学习率搜索策略，选择0.001作为初始学习率，并使用"指数衰减"策略进行调整。'
  },
  {
    title: '批量大小选择',
    description:
      '通过实验比较，选择64作为最佳批量大小，平衡训练效率和模型性能。'
  },
  {
    title: '优化器选择',
    description:
      '使用Adam优化器，并对其超参数β₁和β₂进行微调，以适应眼疾数据分布。'
  },
  {
    title: '正则化策略',
    description:
      '采用L2正则化（λ=0.01）和Dropout（率=0.5）来防止过拟合，提高模型泛化能力。'
  },
  {
    title: '损失函数选择',
    description: '使用多标签交叉熵损失函数，并引入加权策略处理类别不平衡问题。'
  }
]
</script>

<style scoped>
@import 'tailwindcss';
.medical-data-analysis {
  @apply bg-gray-100 min-h-screen;
}

h2 {
  @apply text-blue-600;
}

.transition {
  transition: all 0.3s ease;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (max-width: 768px) {
  .medical-data-analysis {
    @apply text-sm;
  }
}
</style>
