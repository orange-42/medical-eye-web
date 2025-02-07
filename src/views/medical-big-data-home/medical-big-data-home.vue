<template>
  <div class="medical-data-analysis">
    <!-- Header -->
    <header
      class="bg-gradient-to-r from-blue-800 to-indigo-900 text-white p-4 sticky top-0 z-50"
    >
      <nav class="container mx-auto flex justify-between items-center">
        <div class="flex items-center">
          <!-- <img
            src="../../assets/images/test1.png?height=40&width=40"
            alt="Logo"
            class="h-10 w-10 mr-3"
          /> -->
          <h1 class="text-2xl font-bold">医学大数据分析</h1>
        </div>
        <div class="hidden lg:flex space-x-6">
          <!-- :href="`#${section.id}`" -->

          <a
            v-for="section in sections"
            :key="section.id"
            @click.prevent="scrollToSection(section.id)"
            class="hover:text-blue-200 transition duration-300"
          >
            {{ section.title }}
          </a>
        </div>
        <button @click="toggleMenu" class="lg:hidden">
          <MenuIcon />
        </button>
      </nav>
      <div v-if="isMenuOpen" class="lg:hidden mt-4">
        <a
          v-for="section in sections"
          :key="section.id"
          @click.prevent="scrollToSection(section.id)"
          class="block py-2 hover:text-blue-200"
        >
          {{ section.title }}
        </a>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-4 py-8">
      <!-- Hero Section with Carousel -->
      <section class="mb-20">
        <div class="relative h-[70vh] overflow-hidden rounded-2xl shadow-2xl">
          <div class="absolute inset-0">
            <transition-group name="fade" tag="div">
              <div
                v-for="(slide, index) in carouselSlides"
                :key="slide.id"
                v-show="currentSlide === index"
                class="absolute inset-0"
              >
                <img
                  :src="getImageUrl(slide.image)"
                  :alt="slide.alt"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent opacity-70"
                ></div>
                <div
                  class="absolute inset-0 flex items-center justify-start px-12"
                >
                  <div class="max-w-2xl">
                    <h3 class="text-5xl font-bold text-white mb-6">
                      {{ slide.title }}
                    </h3>
                    <p class="text-2xl text-white mb-8">
                      {{ slide.description }}
                    </p>
                    <a
                      @click="diagnose"
                      class="bg-white text-blue-800 font-bold py-3 px-6 rounded-full hover:bg-blue-100 transition duration-300 text-lg"
                    >
                      点击诊断
                    </a>
                  </div>
                </div>
              </div>
            </transition-group>
          </div>
          <button
            @click="prevSlide"
            class="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/30 cursor-pointer rounded-full p-3 hover:bg-white/50 transition duration-300"
          >
            <ChevronLeftIcon class="h-8 w-8 text-white" />
          </button>
          <button
            @click="nextSlide"
            class="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/30 cursor-pointer rounded-full p-3 hover:bg-white/50 transition duration-300"
          >
            <ChevronRightIcon class="h-8 w-8 text-white" />
          </button>
        </div>
      </section>

      <!-- Introduction Section -->
      <section id="introduction" class="mb-20">
        <h2 class="text-4xl font-bold mb-10 text-blue-800 text-center">
          双目彩色眼底图像数据预处理的概述与简介
        </h2>
        <div
          class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
        >
          <p class="mb-6 text-lg leading-relaxed">
            眼底图像作为眼科疾病诊断的重要工具，能够提供丰富的视网膜结构信息，对于早期发现和诊断眼疾具有至关重要的作用。随着深度学习技术在医学影像领域的广泛应用，眼底图像的自动化分析成为眼科疾病早期检测和分类的关键技术之一。
          </p>
          <p class="mb-6 text-lg leading-relaxed">
            然而，由于眼底图像的复杂性及其多样性，数据预处理在确保模型性能和泛化能力方面扮演着重要角色。本研究基于双目彩色眼底图像数据集，进行了一系列的数据预处理工作，旨在为后续的多标签图像分类任务提供高质量的输入数据。
          </p>
          <div class="flex justify-center">
            <img
              src="../../assets/images/test2.png?height=300&width=500"
              alt="眼底图像示例"
              class="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <!-- Dataset Overview Section -->
      <section id="dataset" class="mb-20">
        <h2 class="text-4xl font-bold mb-10 text-blue-800 text-center">
          数据集概述
        </h2>
        <div
          class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
        >
          <p class="mb-6 text-lg leading-relaxed">
            本研究使用的数据集包含了5770张双目彩色眼底图像，每张图像来源于真实的临床病例，并涵盖了以下六种常见眼疾的病例：
          </p>
          <div class="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
            <div
              v-for="disease in eyeDiseases"
              :key="disease.name"
              class="bg-blue-50 p-6 rounded-xl text-center shadow-md hover:shadow-lg transition duration-300"
            >
              <h3 class="font-semibold text-blue-800 text-xl">
                {{ disease.name }}
              </h3>
            </div>
          </div>
          <p class="mb-6 text-lg leading-relaxed">
            每张图像至少包含一种眼疾的病变区域，部分图像可能同时呈现多个眼疾，因此本数据集被定义为多标签图像分类任务。具体而言，数据集中的每一张图像都与相应的标签（包含病种信息）配对，标签呈现为多标签形式，每个标签代表一个或多个眼科疾病的存在。
          </p>
          <div class="flex justify-center mt-8">
            <img
              src="../../assets/images/test2.png?height=400&width=600"
              alt="数据集示例"
              class="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <!-- Data Preprocessing Section -->
      <section id="preprocessing" class="mb-20">
        <h2 class="text-4xl font-bold mb-10 text-blue-800 text-center">
          数据预处理
        </h2>
        <div
          class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
        >
          <h3 class="text-2xl font-semibold mb-6 text-blue-700">
            数据预处理的重要性
          </h3>
          <p class="mb-6 text-lg leading-relaxed">
            数据预处理是图像分析中的关键步骤，尤其对于医学图像任务而言，它直接影响到模型的训练效率和准确性。在眼底图像的分析中，图像往往受到不同程度的噪声、光照变化、对比度不均等因素的影响，这些问题会干扰模型的训练和预测。因此，通过一系列预处理技术，能够有效提高数据质量，减少干扰，提取出有用的特征信息，为后续的分类任务提供更加可靠的输入。
          </p>

          <h3 class="text-2xl font-semibold mb-6 text-blue-700">
            双目彩色眼底图像的预处理流程
          </h3>
          <p class="mb-6 text-lg leading-relaxed">
            对于双目彩色眼底图像，预处理的目标是确保输入图像的质量一致性并增强图像的可用信息。具体的预处理步骤包括以下几个方面：
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div
              v-for="(step, index) in preprocessingSteps"
              :key="index"
              class="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition duration-300"
            >
              <h4 class="font-semibold text-blue-700 mb-3 text-xl">
                {{ step.title }}
              </h4>
              <p class="text-gray-700">{{ step.description }}</p>
            </div>
          </div>

          <h3 class="text-2xl font-semibold mt-10 mb-6 text-blue-700">
            预处理的效果与意义
          </h3>
          <p class="mb-6 text-lg leading-relaxed">
            通过以上预处理步骤，数据集中的眼底图像得到了显著的质量提升。去噪和增强操作有效减少了图像中的干扰因素，标准化与归一化则保证了输入数据的统一性与稳定性。裁剪与重采样确保了图像的统一尺寸，数据增强进一步增加了模型的训练数据量，避免了过拟合问题。此外，合理的多标签处理方式使得每个眼疾的识别变得更加精准，充分利用了图像中的多重标签信息。
          </p>
          <p class="text-lg leading-relaxed">
            这些预处理步骤为后续的眼疾分类任务奠定了坚实的基础，能够帮助模型更好地识别和分类糖尿病视网膜病变、青光眼、白内障、AMD、高血压、近视等多种眼疾。同时，这也提高了模型的泛化能力，使得其能够在不同患者的眼底图像上实现高效的诊断与分类。
          </p>
        </div>
      </section>

      <!-- Eye Diseases Section -->
      <section id="diseases" class="mb-20">
        <h2 class="text-4xl font-bold mb-10 text-blue-800 text-center">
          常见眼疾介绍
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="disease in eyeDiseases"
            :key="disease.name"
            class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
          >
            <h3 class="text-2xl font-semibold mb-4 text-blue-700">
              {{ disease.name }}
            </h3>
            <p class="mb-4 text-lg leading-relaxed">
              {{ disease.description }}
            </p>
            <h4 class="font-semibold mb-2 text-blue-600">症状：</h4>
            <ul class="list-disc list-inside mb-4 text-gray-700">
              <li v-for="symptom in disease.symptoms" :key="symptom">
                {{ symptom }}
              </li>
            </ul>
            <p class="text-lg leading-relaxed">
              <strong class="text-blue-600">诊断与治疗：</strong>
              {{ disease.diagnosis }}
            </p>
          </div>
        </div>
      </section>

      <!-- Model Introduction Section -->
      <section id="model" class="mb-20">
        <h2 class="text-4xl font-bold mb-10 text-blue-800 text-center">
          眼疾识别模型概述
        </h2>
        <div
          class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
        >
          <p class="mb-6 text-lg leading-relaxed">
            眼疾识别模型采用ResNet50作为基础网络架构，借助其深度残差学习机制，在处理眼部影像时能够有效提取复杂的特征信息。ResNet50作为一种高效的卷积神经网络，通过引入残差模块，解决了深层网络训练中的梯度消失问题，使得模型在多层次特征提取的同时，能够保持较高的准确性和稳定性。
          </p>
          <p class="mb-6 text-lg leading-relaxed">
            通过在该架构基础上进行改进，结合图像增强、数据预处理等技术，眼疾识别模型能够更好地适应不同类型的眼疾（如糖尿病视网膜病变、青光眼、白内障等）的检测任务，从而提高早期诊断的效率和准确度。
          </p>
          <p class="mb-10 text-lg leading-relaxed">
            ResNet50的优势在于其层次化特征提取能力，使得模型不仅能够捕捉到局部细节信息，还能够识别全局结构，为眼疾的识别和分类提供了强有力的技术支持。
          </p>

          <h3 class="text-2xl font-semibold mb-6 text-blue-700">
            ResNet50网络结构
          </h3>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div
              v-for="(feature, index) in resnetFeatures"
              :key="index"
              class="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition duration-300"
            >
              <h4 class="font-semibold text-blue-700 mb-3 text-xl">
                {{ feature.title }}
              </h4>
              <p class="text-gray-700">{{ feature.description }}</p>
            </div>
          </div>
          <div class="flex justify-center mt-10">
            <img
              src="../../assets/images/test4.png?height=400&width=60"
              alt="ResNet50 架构图"
              class="rounded-lg shadow-md"
            />
          </div>
        </div>
      </section>

      <!-- Parameter Tuning Section -->
      <section id="parameter-tuning" class="mb-20">
        <h2 class="text-4xl font-bold mb-10 text-blue-800 text-center">
          模型的参数调优过程
        </h2>
        <div
          class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
        >
          <p class="mb-6 text-lg leading-relaxed">
            在眼疾识别任务中，模型的性能高度依赖于超参数的选择。为了最大化模型的分类效果，合理的超参数调优过程是至关重要的。模型的参数调优不仅能够优化模型在训练集上的表现，还能提高其在验证集及实际应用中的泛化能力。
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div
              v-for="(param, index) in tuningParams"
              :key="index"
              class="bg-blue-50 p-6 rounded-xl hover:shadow-lg transition duration-300"
            >
              <h4 class="font-semibold text-blue-700 mb-3 text-xl">
                {{ param.title }}
              </h4>
              <p class="text-gray-700">{{ param.description }}</p>
            </div>
          </div>

          <p class="mt-10 text-lg leading-relaxed">
            通过以上参数调优过程，我们成功地在训练集和验证集上优化了模型性能。模型不仅提升了在验证集上的准确率，还改善了模型的泛化能力，能够较好地处理不同类型的眼底图像，尤其是在糖尿病视网膜病变、青光眼、白内障等眼疾的分类精度上取得了较好效果。
          </p>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="mb-20">
        <h2 class="text-4xl font-bold mb-10 text-blue-800 text-center">
          关于我们
        </h2>
        <div
          class="bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition duration-300"
        >
          <p class="mb-6 text-lg leading-relaxed">
            我们是一个致力于利用人工智能技术改善医疗诊断的研究团队。我们的目标是通过开发先进的图像分析算法，帮助医生更早、更准确地诊断眼科疾病。
          </p>
          <p class="mb-6 text-lg leading-relaxed">
            通过结合深度学习技术和医学专业知识，我们旨在为眼科医生提供强大的辅助诊断工具，提高诊断的准确性和效率。我们的研究不仅关注技术的创新，更注重其在临床实践中的实际应用和价值。
          </p>
          <div class="mt-10 bg-blue-50 p-6 rounded-xl">
            <h3 class="font-semibold text-blue-700 mb-4 text-2xl">联系我们</h3>
            <p class="text-lg mb-2">
              <strong class="text-blue-600">邮箱：</strong>
              contact@medicaldataanalysis.com
            </p>
            <p class="text-lg">
              <strong class="text-blue-600">电话：</strong> +86 123 4567 8900
            </p>
          </div>
        </div>
      </section>
    </main>

    <!-- Footer -->
    <footer
      class="bg-gradient-to-r from-blue-800 to-indigo-900 text-white py-10"
    >
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 class="text-2xl font-bold mb-4">医学大数据分析</h3>
            <p class="mb-4">致力于利用人工智能技术改善医疗诊断</p>
            <div class="flex space-x-4">
              <a href="#" class="text-white hover:text-blue-200">
                <TwitterIcon />
              </a>
              <a href="#" class="text-white hover:text-blue-200">
                <FacebookIcon />
              </a>
              <a href="#" class="text-white hover:text-blue-200">
                <LinkedinIcon />
              </a>
            </div>
          </div>
          <div>
            <h4 class="text-xl font-semibold mb-4">快速链接</h4>
            <ul class="space-y-2">
              <li>
                <a
                  @click.prevent="scrollToSection('introduction')"
                  class="hover:text-blue-200"
                  >简介</a
                >
              </li>
              <li>
                <a
                  @click.prevent="scrollToSection('dataset')"
                  class="hover:text-blue-200"
                  >数据集</a
                >
              </li>
              <li>
                <a
                  @click.prevent="scrollToSection('preprocessing')"
                  class="hover:text-blue-200"
                  >数据预处理</a
                >
              </li>
              <li>
                <a
                  @click.prevent="scrollToSection('diseases')"
                  class="hover:text-blue-200"
                  >眼疾介绍</a
                >
              </li>
              <li>
                <a
                  @click.prevent="scrollToSection('model')"
                  class="hover:text-blue-200"
                  >模型介绍</a
                >
              </li>
              <li>
                <a
                  @click.prevent="scrollToSection('parameter-tuning')"
                  class="hover:text-blue-200"
                  >参数调优</a
                >
              </li>
            </ul>
          </div>
          <div>
            <h4 class="text-xl font-semibold mb-4">联系我们</h4>
            <p class="mb-2">邮箱：contact@medicaldataanalysis.com</p>
            <p>电话：+86 123 4567 8900</p>
          </div>
        </div>
        <div class="mt-8 pt-8 border-t border-blue-700 text-center">
          <p>&copy; 2023 医学大数据分析团队. 保留所有权利。</p>
        </div>
      </div>
    </footer>
  </div>
  <diagnoseModal width="90%" v-model="visible" v-if="visible"/>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import {
  MenuIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon
} from 'lucide-vue-next'
import diagnoseModal from './components/diagnoseModal.vue'

const isMenuOpen = ref(false)
const currentSlide = ref(0)

const visible = ref(false)
function diagnose () {
  visible.value = true
}

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

function scrollToSection(id) {
  const element = document.getElementById(id)
  if (element) {
    // 获取当前页面的滚动位置
    const currentScroll = window.scrollY || window.pageYOffset
    // 获取目标元素距离文档顶部的距离
    const elementOffset = element.getBoundingClientRect().top + currentScroll
    // 计算偏移后的滚动位置
    const offsetPosition = elementOffset - 92

    // 平滑滚动到指定位置
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
  isMenuOpen.value = false
}

const carouselSlides = [
  {
    id: 1,
    title: '眼底图像分析革新',
    description: '利用深度学习技术，实现眼底图像的自动化分析',
    image: 'swiper1.png',
    alt: '眼底图像分析示意图',
    link: '#introduction'
  },
  {
    id: 2,
    title: '多种眼疾早期检测',
    description: '准确识别多种常见眼疾，助力早期诊断',
    image: 'swiper2.png',
    alt: '眼疾检测流程图',
    link: '#diseases'
  },
  {
    id: 3,
    title: '先进的深度学习模型',
    description: '基于ResNet50的眼疾识别模型',
    image: 'test4.png',
    alt: '深度学习模型架构图',
    link: '#model'
  }
]

const getImageUrl = (imageName) => {
  return new URL(`/src/assets/images/${imageName}`, import.meta.url).href
}

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
      '糖尿病患者常见的眼部并发症，由长期高血糖引起视网膜血管受损，导致视力丧失。糖尿病视网膜病变通常分为非增殖性和增殖性两期。',
    symptoms: ['视网膜微小出血', '水肿', '新生血管形成'],
    diagnosis:
      '早期诊断可以避免病情进一步发展，及时干预和治疗（如激光治疗或抗VEGF药物）可以有效控制病情，保护视力。通过眼底图像的自动化识别技术，能够在无症状阶段发现视网膜微血管病变，为糖尿病患者提供定期筛查和早期治疗的机会。'
  },
  {
    name: '青光眼',
    description:
      '青光眼是一种因眼内压力过高而导致视神经损伤的眼病。常见的青光眼类型包括开角型青光眼和闭角型青光眼。青光眼最显著的特点是视野逐渐丧失，若不及时治疗，可能导致失明。',
    symptoms: ['视野逐渐丧失', '眼痛', '头痛', '恶心（闭角型）'],
    diagnosis:
      '早期识别青光眼可以帮助降低眼内压力，从而减少对视神经的损伤。定期眼压检测和视野检查对青光眼的筛查至关重要，通过自动化影像识别系统可以提高筛查效率，尤其对于高风险人群（如老年人和家族有青光眼病史的人）更为关键。'
  },
  {
    name: '白内障',
    description:
      '白内障是眼睛晶状体变得浑浊，导致视力逐渐下降的疾病。随着年龄增长，晶状体的蛋白质可能逐渐发生变化，导致其透明度降低，形成白内障。白内障是导致老年人失明的主要原因，但通过手术可以有效治疗。',
    symptoms: ['视物模糊', '光敏感', '夜间视力差'],
    diagnosis:
      '白内障的早期诊断可以帮助医生和患者决定是否需要手术治疗，延缓其影响。眼科影像技术（如眼前段照相和光学相干断层扫描）能够帮助识别白内障的早期迹象，监测其发展速度，并为手术时机的选择提供依据。'
  },
  {
    name: '年龄相关性黄斑变性',
    description:
      '黄斑变性是导致老年人视力丧失的主要原因之一，尤其是影响中央视力。黄斑是视网膜中负责高分辨率视觉的区域，黄斑变性会导致中央视力模糊或失真。黄斑变性分为干性和湿性两种类型。',
    symptoms: ['中央视力模糊或失真', '视物变形', '中心暗点'],
    diagnosis:
      '早期识别黄斑变性能够及时干预，减少视力丧失的风险。湿性黄斑变性如果能够及时通过抗VEGF治疗干预，往往能有效减缓病情的进展。通过光学相干断层扫描（OCT）和视网膜成像技术，可以快速、准确地识别黄斑变性，特别是在早期阶段。'
  },
  {
    name: '高血压引起的视网膜病变',
    description:
      '高血压可导致眼底血管病变，影响视网膜的血流供应，造成视力损伤。高血压视网膜病变的症状包括眼底出血、视网膜水肿、视网膜动脉硬化等。长期高血压可能导致视网膜缺血、视神经损伤，甚至导致视力丧失。',
    symptoms: ['眼底出血', '视网膜水肿', '视网膜动脉硬化'],
    diagnosis:
      '定期进行眼底检查可以帮助及时发现高血压引起的视网膜损伤，及早采取措施控制血压，防止视力进一步丧失。眼底影像技术（如眼底照片和OCT扫描）是评估视网膜健康的有效工具，能够帮助医生在高血压患者中及早识别视网膜病变的征兆。'
  },
  {
    name: '近视',
    description:
      '近视是眼睛在看远处物体时无法清晰聚焦的状态，通常由于眼球过长或角膜曲率过大所致。近视不仅影响日常生活，而且高度近视可能引发更严重的眼疾，如视网膜脱落、青光眼等。',
    symptoms: ['远处物体看不清', '眼睛疲劳', '头痛'],
    diagnosis:
      '早期识别近视可以帮助采取适当的矫正措施，如佩戴眼镜或隐形眼镜，减缓近视进展。高度近视患者更容易发生眼底病变，定期检查可以及时发现这些潜在风险，避免严重后果。近视的防控对于儿童尤为重要，早期干预措施（如控制用眼、适当户外活动等）能够有效减缓近视的加重。'
  }
]

const preprocessingSteps = [
  {
    title: '图像去噪与增强',
    description:
      '使用去噪算法（如高斯滤波、中值滤波等）对图像进行处理，并进行对比度增强和亮度调整，以提高图像质量和可识别性。'
  },
  {
    title: '图像标准化与归一化',
    description:
      '将图像像素值进行标准化（如减去均值，除以标准差）或归一化（将像素值缩放到0到1之间），以确保不同图像之间的一致性和可比性。'
  },
  {
    title: '图像裁剪与重采样',
    description:
      '将图像统一缩放到固定大小224×224，并进行中心裁剪或边缘裁剪，以保留视网膜的主要区域，确保输入数据的一致性。'
  },
  {
    title: '数据增强',
    description:
      '通过旋转、平移、缩放、翻转等操作生成更多的变换图像，增加训练数据的多样性，提升模型的泛化能力。'
  },
  {
    title: '多标签处理',
    description:
      '将每张图像的标签处理为二进制向量，表示图像是否包含某一眼疾，以适应多标签分类任务的需求。'
  }
]

const resnetFeatures = [
  {
    title: '残差连接',
    description:
      '通过跳跃连接解决深层网络的梯度消失问题，提高训练效率和模型性能。'
  },
  {
    title: '深度特征提取',
    description:
      '50层深度网络能够提取复杂的图像特征，适用于眼底图像的细节分析和病变识别。'
  },
  {
    title: '全局平均池化',
    description:
      '减少过拟合风险，提高模型的泛化能力，使模型更适合处理不同来源的眼底图像。'
  },
  {
    title: '多尺度特征学习',
    description:
      '通过不同大小的卷积核，捕捉眼底图像中的多尺度特征，有助于识别不同大小的病变区域。'
  }
]

const tuningParams = [
  {
    title: '学习率调优',
    description:
      '采用学习率搜索策略，选择0.001作为初始学习率，并使用"指数衰减"策略进行调整，以在训练过程中平衡收敛速度和稳定性。'
  },
  {
    title: '批量大小选择',
    description:
      '通过实验比较，选择64作为最佳批量大小，平衡训练效率和模型性能，同时考虑硬件资源限制。'
  },
  {
    title: '优化器选择',
    description:
      '使用Adam优化器，并对其超参数β₁和β₂进行微调，以适应眼疾数据分布的特点，提高模型的收敛速度和稳定性。'
  },
  {
    title: '正则化策略',
    description:
      '采用L2正则化（λ=0.01）和Dropout（率=0.5）来防止过拟合，提高模型泛化能力，使模型能够更好地应对未见过的眼底图像。'
  },
  {
    title: '损失函数选择',
    description:
      '使用多标签交叉熵损失函数，并引入加权策略处理类别不平衡问题，确保模型对各种眼疾都有良好的识别能力。'
  }
]
</script>

<style scoped>
@import 'tailwindcss';
.medical-data-analysis {
  @apply bg-gray-100 min-h-screen;
}

h2 {
  @apply text-blue-800;
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
