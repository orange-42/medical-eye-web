<template>
  <div class="medical-data-analysis">
    <!-- Header -->
    <header class="bg-blue-600 text-white p-4 sticky top-0 z-50">
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
      <!-- Introduction Section -->
      <section id="introduction" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">
          双目彩色眼底图像数据预处理的概述与简介
        </h2>
        <div class="bg-white p-6 rounded-lg shadow-md">
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
        <div class="bg-white p-6 rounded-lg shadow-md">
          <p class="mb-4">
            本研究使用的数据集包含了5770张双目彩色眼底图像，每张图像来源于真实的临床病例，并涵盖了以下六种常见眼疾的病例：
          </p>
          <ul class="list-disc list-inside mb-4">
            <li>糖尿病视网膜病变（DR）</li>
            <li>青光眼</li>
            <li>白内障</li>
            <li>年龄相关性黄斑变性（AMD）</li>
            <li>高血压</li>
            <li>近视</li>
          </ul>
          <p class="mb-4">
            每张图像至少包含一种眼疾的病变区域，部分图像可能同时呈现多个眼疾，因此本数据集被定义为多标签图像分类任务。具体而言，数据集中的每一张图像都与相应的标签（包含病种信息）配对，标签呈现为多标签形式，每个标签代表一个或多个眼科疾病的存在。
          </p>
        </div>
      </section>

      <!-- Data Preprocessing Section -->
      <section id="preprocessing" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">数据预处理</h2>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <h3 class="text-xl font-semibold mb-4">数据预处理的重要性</h3>
          <p class="mb-4">
            数据预处理是图像分析中的关键步骤，尤其对于医学图像任务而言，它直接影响到模型的训练效率和准确性。在眼底图像的分析中，图像往往受到不同程度的噪声、光照变化、对比度不均等因素的影响，这些问题会干扰模型的训练和预测。因此，通过一系列预处理技术，能够有效提高数据质量，减少干扰，提取出有用的特征信息，为后续的分类任务提供更加可靠的输入。
          </p>

          <h3 class="text-xl font-semibold mb-4">
            双目彩色眼底图像的预处理流程
          </h3>
          <p class="mb-4">
            对于双目彩色眼底图像，预处理的目标是确保输入图像的质量一致性并增强图像的可用信息。具体的预处理步骤包括以下几个方面：
          </p>

          <div class="space-y-4">
            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                图像去噪与增强
              </summary>
              <p class="mt-2">
                由于眼底图像中可能存在各种噪声，如设备本身的噪点和运动模糊等，因此首先需要使用去噪算法（如高斯滤波、中值滤波等）对图像进行处理。此外，图像的对比度增强和亮度调整也是常见的预处理方法，这有助于增强视网膜和病变区域的可见度，使模型能够更加容易地识别重要的特征。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                图像标准化与归一化
              </summary>
              <p class="mt-2">
                为了确保输入图像的像素值在一个统一的范围内，图像像素值常常需要进行标准化（如减去均值，除以标准差）或归一化（将像素值缩放到0到1之间）。这一步骤有助于提高训练过程中的稳定性，避免由于不同图像的亮度和对比度差异导致训练结果的不一致。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                图像裁剪与重采样
              </summary>
              <p class="mt-2">
                眼底图像的大小和比例可能因拍摄角度和视网膜区域的差异而有所不同。为了使模型能够处理大小一致的图像，通常需要对图像进行裁剪或缩放。在本研究中，图像被统一缩放到固定大小224×224，并且在保持视网膜区域尽可能完整的前提下进行中心裁剪或边缘裁剪，确保视网膜的主要区域能够被保留用于后续分析。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">数据增强</summary>
              <p class="mt-2">
                为了增强模型的泛化能力，并解决数据集可能存在的类别不平衡问题，本研究还进行了数据增强操作，包括旋转、平移、缩放、翻转等。通过这些操作，可以生成更多的变换图像，提升训练数据的多样性，从而使得训练过程更加鲁棒。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">多标签处理</summary>
              <p class="mt-2">
                由于本数据集涉及多个类别的眼疾，且每张图像可能包含一个或多个眼疾。因此，标签处理的方式为多标签分类。每张图像的标签是一个二进制向量，表示图像是否包含某一眼疾，例如糖尿病视网膜病变、青光眼等。为了确保多标签任务能够正确学习到不同眼疾的特征，本研究采用了二进制交叉熵（Binary
                Cross-Entropy）损失函数来优化模型，以确保每个眼疾类别都能得到有效的识别。
              </p>
            </details>
          </div>

          <h3 class="text-xl font-semibold mt-6 mb-4">预处理的效果与意义</h3>
          <p class="mb-4">
            通过以上预处理步骤，数据集中的眼底图像得到了显著的质量提升。去噪和增强操作有效减少了图像中的干扰因素，标准化与归一化则保证了输入数据的统一性与稳定性。裁剪与重采样确保了图像的统一尺寸，数据增强进一步增加了模型的训练数据量，避免了过拟合问题。此外，合理的多标签处理方式使得每个眼疾的识别变得更加精准，充分利用了图像中的多重标签信息。
          </p>
          <p>
            这些预处理步骤为后续的眼疾分类任务奠定了坚实的基础，能够帮助模型更好地识别和分类糖尿病视网膜病变、青光眼、白内障、AMD、高血压、近视等多种眼疾。同时，这也提高了模型的泛化能力，使得其能够在不同患者的眼底图像上实现高效的诊断与分类。
          </p>
        </div>
      </section>

      <!-- Eye Diseases Section -->
      <section id="diseases" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">常见眼疾介绍</h2>
        <div class="space-y-6">
          <div
            v-for="disease in eyeDiseases"
            :key="disease.name"
            class="bg-white p-6 rounded-lg shadow-md"
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
        <div class="bg-white p-6 rounded-lg shadow-md">
          <p class="mb-4">
            眼疾识别模型采用ResNet50作为基础网络架构，借助其深度残差学习机制，在处理眼部影像时能够有效提取复杂的特征信息。ResNet50作为一种高效的卷积神经网络，通过引入残差模块，解决了深层网络训练中的梯度消失问题，使得模型在多层次特征提取的同时，能够保持较高的准确性和稳定性。
          </p>
          <p class="mb-4">
            通过在该架构基础上进行改进，结合图像增强、数据预处理等技术，眼疾识别模型能够更好地适应不同类型的眼疾（如糖尿病视网膜病变、青光眼、白内障等）的检测任务，从而提高早期诊断的效率和准确度。
          </p>
          <p>
            ResNet50的优势在于其层次化特征提取能力，使得模型不仅能够捕捉到局部细节信息，还能够识别全局结构，为眼疾的识别和分类提供了强有力的技术支持。
          </p>

          <h3 class="text-xl font-semibold mt-6 mb-4">ResNet50网络结构</h3>
          <p class="mb-4">
            ResNet50的网络结构主要包括以下几个部分：输入层、初始卷积层、多个残差块、池化层以及最终的全连接层。通过这些模块的设计，ResNet50能够有效地进行特征提取，同时保持网络训练的稳定性。
          </p>

          <div class="space-y-4 mt-4">
            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                输入层与图像预处理
              </summary>
              <p class="mt-2">
                ResNet50的输入是大小为224×224×3的图像，其中224×224表示图像的高和宽，3表示RGB三个颜色通道。输入图像在进入网络之前通常需要进行统一的尺寸调整、归一化等预处理操作，以确保数据的标准化，便于后续的网络处理。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">初始卷积层</summary>
              <p class="mt-2">
                ResNet50的初始卷积层使用了一个7×7大小的卷积核，并且步幅（Stride）设置为2。这意味着输入图像将通过一个较大的卷积核进行处理，提取较大的感受野（receptive
                field），同时步幅设置为2会使得特征图的尺寸减半，输出尺寸为112×112×64。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                残差模块 (Residual Blocks)
              </summary>
              <p class="mt-2">
                ResNet50的核心创新是引入了残差连接（Residual
                Connection），并通过残差模块（Residual
                Blocks）来增强网络的训练效果。残差模块的主要思想是通过将某一层的输入与该层的输出相加，形成"跳跃连接"（skip
                connection），使得网络能够学习到输入与输出之间的残差（residual），而非直接学习整个映射函数。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                全局平均池化层
              </summary>
              <p class="mt-2">
                在最后的残差阶段之后，ResNet50使用了全局平均池化（Global Average
                Pooling）层。该层的作用是将每个特征图的空间维度（即高度和宽度）进行平均，生成一个长度为2048的特征向量。这一过程可以有效地减少过拟合，并使得模型更加高效。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                全连接层与输出层
              </summary>
              <p class="mt-2">
                全连接层的作用是将特征向量映射到最终的类别输出空间，进行分类任务。在ResNet50中，经过全局平均池化后的2048维特征向量被输入到一个全连接层，通过Softmax激活函数输出最终的类别预测结果。全连接层的输出维度与目标任务中的类别数相同。
              </p>
            </details>
          </div>
        </div>
      </section>

      <!-- Parameter Tuning Section -->
      <section id="parameter-tuning" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">
          模型的参数调优过程
        </h2>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <p class="mb-4">
            在眼疾识别任务中，模型的性能高度依赖于超参数的选择。为了最大化模型的分类效果，合理的超参数调优过程是至关重要的。模型的参数调优不仅能够优化模型在训练集上的表现，还能提高其在验证集及实际应用中的泛化能力。
          </p>

          <div class="space-y-4 mt-4">
            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                学习率（Learning Rate）调优
              </summary>
              <p class="mt-2">
                学习率是影响模型训练速度和最终性能的一个关键超参数。我们采用了学习率搜索策略，最终选择了0.001作为初始学习率，并使用"指数衰减"（Exponential
                Decay）策略进行学习率调整。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                批量大小（Batch Size）调优
              </summary>
              <p class="mt-2">
                通过对不同批量大小（如32、64、128等）进行实验比较，发现批量大小为64时，模型的收敛速度和稳定性较好。因此，最终选择了64作为模型的批量大小。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                优化器（Optimizer）选择与调优
              </summary>
              <p class="mt-2">
                我们选择了Adam作为基础优化器，并对其超参数β₁和β₂进行了微调，以确保它们适应不同类别的眼疾数据分布。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">正则化策略</summary>
              <p class="mt-2">
                我们采用了L2正则化、Dropout和数据增强等方法来避免过拟合并提高模型的泛化能力。L2正则化的λ参数设置为0.01，Dropout率设置为0.5。
              </p>
            </details>

            <details class="bg-gray-100 p-4 rounded-lg">
              <summary class="font-semibold cursor-pointer">
                损失函数（Loss Function）选择与调优
              </summary>
              <p class="mt-2">
                考虑到本研究中的眼疾识别任务，我们选择了多标签交叉熵损失函数（Binary
                Cross-Entropy
                Loss），并引入了加权损失策略来处理类别不平衡的问题。
              </p>
            </details>
          </div>

          <p class="mt-6">
            通过以上参数调优过程，我们成功地在训练集和验证集上优化了模型性能。模型不仅提升了在验证集上的准确率，还改善了模型的泛化能力，能够较好地处理不同类型的眼底图像，尤其是在糖尿病视网膜病变、青光眼、白内障等眼疾的分类精度上取得了较好效果。
          </p>
        </div>
      </section>

      <!-- About Section -->
      <section id="about" class="mb-16">
        <h2 class="text-3xl font-bold mb-8 text-blue-600">关于我们</h2>
        <div class="bg-white p-6 rounded-lg shadow-md">
          <p class="mb-4">
            我们是一个致力于利用人工智能技术改善医疗诊断的研究团队。我们的目标是通过开发先进的图像分析算法，帮助医生更早、更准确地诊断眼科疾病。
          </p>
          <p class="mb-4">
            通过结合深度学习技术和医学专业知识，我们旨在为眼科医生提供强大的辅助诊断工具，提高诊断的准确性和效率。我们的研究不仅关注技术的创新，更注重其在临床实践中的实际应用和价值。
          </p>
          <p>如果您对我们的研究感兴趣或想要合作，请联系我们：</p>
          <p class="mt-4">
            <strong>邮箱：</strong> contact@medicaldataanalysis.com<br />
            <strong>电话：</strong> +86 123 4567 8900
          </p>
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
import { ref } from 'vue'
import { MenuIcon } from 'lucide-vue-next'

const isMenuOpen = ref(false)

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

const eyeDiseases = [
  {
    name: '糖尿病视网膜病变 (Diabetic Retinopathy, DR)',
    description:
      '糖尿病视网膜病变是糖尿病患者常见的眼部并发症，是由于长期高血糖引起视网膜血管受损，导致视力丧失。糖尿病视网膜病变通常分为非增殖性和增殖性两期。',
    symptoms: ['视网膜微小出血', '水肿', '新生血管形成'],
    diagnosis:
      '早期诊断可以避免病情进一步发展，及时干预和治疗（如激光治疗或抗VEGF药物）可以有效控制病情，保护视力。通过眼底图像的自动化识别技术，能够在无症状阶段发现视网膜微血管病变，为糖尿病患者提供定期筛查和早期治疗的机会。'
  },
  {
    name: '青光眼 (Glaucoma)',
    description:
      '青光眼是一种因眼内压力过高而导致视神经损伤的眼病。常见的青光眼类型包括开角型青光眼和闭角型青光眼。青光眼最显著的特点是视野逐渐丧失，若不及时治疗，可能导致失明。',
    symptoms: ['视野逐渐丧失', '眼痛', '头痛', '恶心（闭角型）'],
    diagnosis:
      '早期识别青光眼可以帮助降低眼内压力，从而减少对视神经的损伤。定期眼压检测和视野检查对青光眼的筛查至关重要，通过自动化影像识别系统可以提高筛查效率，尤其对于高风险人群（如老年人和家族有青光眼病史的人）更为关键。'
  },
  {
    name: '白内障 (Cataract)',
    description:
      '白内障是眼睛晶状体变得浑浊，导致视力逐渐下降的疾病。随着年龄增长，晶状体的蛋白质可能逐渐发生变化，导致其透明度降低，形成白内障。白内障是导致老年人失明的主要原因，但通过手术可以有效治疗。',
    symptoms: ['视物模糊', '光敏感', '夜间视力差'],
    diagnosis:
      '白内障的早期诊断可以帮助医生和患者决定是否需要手术治疗，延缓其影响。眼科影像技术（如眼前段照相和光学相干断层扫描）能够帮助识别白内障的早期迹象，监测其发展速度，并为手术时机的选择提供依据。'
  },
  {
    name: '年龄相关性黄斑变性 (Age-related Macular Degeneration, AMD)',
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
    name: '近视 (Myopia)',
    description:
      '近视是眼睛在看远处物体时无法清晰聚焦的状态，通常由于眼球过长或角膜曲率过大所致。近视不仅影响日常生活，而且高度近视可能引发更严重的眼疾，如视网膜脱落、青光眼等。',
    symptoms: ['远处物体看不清', '眼睛疲劳', '头痛'],
    diagnosis:
      '早期识别近视可以帮助采取适当的矫正措施，如佩戴眼镜或隐形眼镜，减缓近视进展。高度近视患者更容易发生眼底病变，定期检查可以及时发现这些潜在风险，避免严重后果。近视的防控对于儿童尤为重要，早期干预措施（如控制用眼、适当户外活动等）能够有效减缓近视的加重。'
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

@media (max-width: 768px) {
  .medical-data-analysis {
    @apply text-sm;
  }
}
</style>
