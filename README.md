# web-Drone
```
git clone https://github.com/nguyentuanvuong/web-Drone.git
cd web-Drone
npm install
npm start
```
## Live app
https://drone-covid.herokuapp.com/

{"event_name":"fire_position","body":{"position":{"x":90,"y":40}}}

{"event_name":"fire_position","body":{"position":{"x":147,"y":57}}}

{"event_name":"fire_position","body":{"position":{"x":55,"y":80}}}


### tai lieu
https://whatwebcando.today/serial.html

# Sumary

## TF

```
_________________________________________________________________
Layer (type)                 Output shape              Param #   
=================================================================
dense_Dense35 (Dense)        [null,100]                500       
_________________________________________________________________
dense_Dense36 (Dense)        [null,2]                  202       
=================================================================
Total params: 702
Trainable params: 702
Non-trainable params: 0
_________________________________________________________________
```

## YOLO
```
                 from  n    params  module                                  arguments                     
  0                -1  1      3520  models.common.Focus                     [3, 32, 3]                    
2021-12-20 00:14:04.889316: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'libcuda.so.1'; dlerror: libcuda.so.1: cannot open shared object file: No such file or directory; LD_LIBRARY_PATH: /home/tuanvuong/.local/lib/python3.8/site-packages/cv2/../../lib64:
2021-12-20 00:14:04.890548: W tensorflow/stream_executor/cuda/cuda_driver.cc:269] failed call to cuInit: UNKNOWN ERROR (303)
2021-12-20 00:14:04.890885: I tensorflow/stream_executor/cuda/cuda_diagnostics.cc:156] kernel driver does not appear to be running on this host (DESKTOP-AT3AU7E): /proc/driver/nvidia/version does not exist
2021-12-20 00:14:04.894511: I tensorflow/core/platform/cpu_feature_guard.cc:151] This TensorFlow binary is optimized with oneAPI Deep Neural Network Library (oneDNN) to use the following CPU instructions in performance-critical operations:  AVX2 FMA
To enable them in other operations, rebuild TensorFlow with the appropriate compiler flags.
  1                -1  1     18560  models.common.Conv                      [32, 64, 3, 2]                
  2                -1  1     18816  models.common.C3                        [64, 64, 1]                   
  3                -1  1     73984  models.common.Conv                      [64, 128, 3, 2]               
  4                -1  1    156928  models.common.C3                        [128, 128, 3]                 
  5                -1  1    295424  models.common.Conv                      [128, 256, 3, 2]              
  6                -1  1    625152  models.common.C3                        [256, 256, 3]                 
  7                -1  1   1180672  models.common.Conv                      [256, 512, 3, 2]              
  8                -1  1    656896  models.common.SPP                       [512, 512, [5, 9, 13]]        
  9                -1  1   1182720  models.common.C3                        [512, 512, 1, False]          
 10                -1  1    131584  models.common.Conv                      [512, 256, 1, 1]              
 11                -1  1         0  torch.nn.modules.upsampling.Upsample    [None, 2, 'nearest']          
 12           [-1, 6]  1         0  models.common.Concat                    [1]                           
 13                -1  1    361984  models.common.C3                        [512, 256, 1, False]          
 14                -1  1     33024  models.common.Conv                      [256, 128, 1, 1]              
 15                -1  1         0  torch.nn.modules.upsampling.Upsample    [None, 2, 'nearest']          
 16           [-1, 4]  1         0  models.common.Concat                    [1]                           
 17                -1  1     90880  models.common.C3                        [256, 128, 1, False]          
 18                -1  1    147712  models.common.Conv                      [128, 128, 3, 2]              
 19          [-1, 14]  1         0  models.common.Concat                    [1]                           
 20                -1  1    296448  models.common.C3                        [256, 256, 1, False]          
 21                -1  1    590336  models.common.Conv                      [256, 256, 3, 2]              
 22          [-1, 10]  1         0  models.common.Concat                    [1]                           
 23                -1  1   1182720  models.common.C3                        [512, 512, 1, False]          
 24      [17, 20, 23]  1     16182  models.yolo.Detect                      [1, [[10, 13, 16, 30, 33, 23], [30, 61, 62, 45, 59, 119], [116, 90, 156, 198, 373, 326]], [128, 256, 512], [256, 256]]
Model: "model"
__________________________________________________________________________________________________
 Layer (type)                   Output Shape         Param #     Connected to                     
==================================================================================================
 input_1 (InputLayer)           [(1, 256, 256, 3)]   0           []                               
                                                                                                  
 tf_focus (TFFocus)             (1, 128, 128, 32)    3488        ['input_1[0][0]']                
                                                                                                  
 tf_conv_1 (TFConv)             (1, 64, 64, 64)      18496       ['tf_focus[0][0]']               
                                                                                                  
 tfc3 (TFC3)                    (1, 64, 64, 64)      18624       ['tf_conv_1[0][0]']              
                                                                                                  
 tf_conv_7 (TFConv)             (1, 32, 32, 128)     73856       ['tfc3[0][0]']                   
                                                                                                  
 tfc3_1 (TFC3)                  (1, 32, 32, 128)     156288      ['tf_conv_7[0][0]']              
                                                                                                  
 tf_conv_17 (TFConv)            (1, 16, 16, 256)     295168      ['tfc3_1[0][0]']                 
                                                                                                  
 tfc3_2 (TFC3)                  (1, 16, 16, 256)     623872      ['tf_conv_17[0][0]']             
                                                                                                  
 tf_conv_27 (TFConv)            (1, 8, 8, 512)       1180160     ['tfc3_2[0][0]']                 
                                                                                                  
 tfspp (TFSPP)                  (1, 8, 8, 512)       656128      ['tf_conv_27[0][0]']             
                                                                                                  
 tfc3_3 (TFC3)                  (1, 8, 8, 512)       1181184     ['tfspp[0][0]']                  
                                                                                                  
 tf_conv_35 (TFConv)            (1, 8, 8, 256)       131328      ['tfc3_3[0][0]']                 
                                                                                                  
 tf_upsample (TFUpsample)       (1, 16, 16, 256)     0           ['tf_conv_35[0][0]']             
                                                                                                  
 tf_concat (TFConcat)           (1, 16, 16, 512)     0           ['tf_upsample[0][0]',            
                                                                  'tfc3_2[0][0]']                 
                                                                                                  
 tfc3_4 (TFC3)                  (1, 16, 16, 256)     361216      ['tf_concat[0][0]']              
                                                                                                  
 tf_conv_41 (TFConv)            (1, 16, 16, 128)     32896       ['tfc3_4[0][0]']                 
                                                                                                  
 tf_upsample_1 (TFUpsample)     (1, 32, 32, 128)     0           ['tf_conv_41[0][0]']             
                                                                                                  
 tf_concat_1 (TFConcat)         (1, 32, 32, 256)     0           ['tf_upsample_1[0][0]',          
                                                                  'tfc3_1[0][0]']                 
                                                                                                  
 tfc3_5 (TFC3)                  (1, 32, 32, 128)     90496       ['tf_concat_1[0][0]']            
                                                                                                  
 tf_conv_47 (TFConv)            (1, 16, 16, 128)     147584      ['tfc3_5[0][0]']                 
                                                                                                  
 tf_concat_2 (TFConcat)         (1, 16, 16, 256)     0           ['tf_conv_47[0][0]',             
                                                                  'tf_conv_41[0][0]']             
                                                                                                  
 tfc3_6 (TFC3)                  (1, 16, 16, 256)     295680      ['tf_concat_2[0][0]']            
                                                                                                  
 tf_conv_53 (TFConv)            (1, 8, 8, 256)       590080      ['tfc3_6[0][0]']                 
                                                                                                  
 tf_concat_3 (TFConcat)         (1, 8, 8, 512)       0           ['tf_conv_53[0][0]',             
                                                                  'tf_conv_35[0][0]']             
                                                                                                  
 tfc3_7 (TFC3)                  (1, 8, 8, 512)       1181184     ['tf_concat_3[0][0]']            
                                                                                                  
 tf_detect (TFDetect)           ((1, 4032, 6),       16182       ['tfc3_5[0][0]',                 
                                 [(1, 3, 1024, 6),                'tfc3_6[0][0]',                 
                                 (1, 3, 256, 6),                  'tfc3_7[0][0]']                 
                                 (1, 3, 64, 6)])                                                  
                                                                                                  
 tf.__operators__.getitem (Slic  (1, 4032, 4)        0           ['tf_detect[0][0]']              
 ingOpLambda)                                                                                     
                                                                                                  
 tf.split (TFOpLambda)          [(1, 4032, 1),       0           ['tf.__operators__.getitem[0][0]'
                                 (1, 4032, 1),                   ]                                
                                 (1, 4032, 1),                                                    
                                 (1, 4032, 1)]                                                    
                                                                                                  
 tf.math.truediv (TFOpLambda)   (1, 4032, 1)         0           ['tf.split[0][2]']               
                                                                                                  
 tf.math.truediv_1 (TFOpLambda)  (1, 4032, 1)        0           ['tf.split[0][3]']               
                                                                                                  
 tf.math.truediv_2 (TFOpLambda)  (1, 4032, 1)        0           ['tf.split[0][2]']               
                                                                                                  
 tf.math.truediv_3 (TFOpLambda)  (1, 4032, 1)        0           ['tf.split[0][3]']               
                                                                                                  
 tf.math.subtract (TFOpLambda)  (1, 4032, 1)         0           ['tf.split[0][0]',               
                                                                  'tf.math.truediv[0][0]']        
                                                                                                  
 tf.math.subtract_1 (TFOpLambda  (1, 4032, 1)        0           ['tf.split[0][1]',               
 )                                                                'tf.math.truediv_1[0][0]']      
                                                                                                  
 tf.__operators__.add (TFOpLamb  (1, 4032, 1)        0           ['tf.split[0][0]',               
 da)                                                              'tf.math.truediv_2[0][0]']      
                                                                                                  
 tf.__operators__.add_1 (TFOpLa  (1, 4032, 1)        0           ['tf.split[0][1]',               
 mbda)                                                            'tf.math.truediv_3[0][0]']      
                                                                                                  
 tf.__operators__.getitem_2 (Sl  (1, 4032, 1)        0           ['tf_detect[0][0]']              
 icingOpLambda)                                                                                   
                                                                                                  
 tf.__operators__.getitem_1 (Sl  (1, 4032, 1)        0           ['tf_detect[0][0]']              
 icingOpLambda)                                                                                   
                                                                                                  
 tf.concat (TFOpLambda)         (1, 4032, 4)         0           ['tf.math.subtract[0][0]',       
                                                                  'tf.math.subtract_1[0][0]',     
                                                                  'tf.__operators__.add[0][0]',   
                                                                  'tf.__operators__.add_1[0][0]'] 
                                                                                                  
 tf.math.multiply (TFOpLambda)  (1, 4032, 1)         0           ['tf.__operators__.getitem_1[0][0
                                                                 ]',                              
                                                                  'tf.__operators__.getitem_2[0][0
                                                                 ]']                              
                                                                                                  
 agnostic_nms_1 (AgnosticNMS)   ((1, None, 4),       0           ['tf.concat[0][0]',              
                                 (1, None),                       'tf.__operators__.getitem_2[0][0
                                 (1, None),                      ]',                              
                                 (1,))                            'tf.math.multiply[0][0]']       
                                                                                                  
==================================================================================================
Total params: 7,053,910
Trainable params: 0
Non-trainable params: 7,053,910
__________________________________________________________________________________________________
Compiled the loaded model, but the compiled metrics have yet to be built. `model.compile_metrics` will be empty until you train or evaluate the model.
2021-12-20 00:14:12.201299: W tensorflow/python/util/util.cc:368] Sets are not currently considered sequences, but this may change in the future, so consider avoiding using them.
Found untraced functions such as tf_conv_layer_call_fn, tf_conv_layer_call_and_return_conditional_losses, tf_conv_2_layer_call_fn, tf_conv_2_layer_call_and_return_conditional_losses, tf_conv_3_layer_call_fn while saving (showing 5 of 550). These functions will not be directly callable after loading.
Assets written to: fire_saved_model/assets
TensorFlow saved_model: export success, saved as fire_saved_model (238.7 MB)

TensorFlow GraphDef: starting export with tensorflow 2.7.0...
2021-12-20 00:14:44.948427: I tensorflow/core/grappler/devices.cc:66] Number of eligible GPUs (core count >= 8, compute capability >= 0.0): 0
2021-12-20 00:14:44.949659: I tensorflow/core/grappler/clusters/single_machine.cc:358] Starting new session
2021-12-20 00:14:45.002700: I tensorflow/core/grappler/optimizers/meta_optimizer.cc:1149] Optimization results for grappler item: graph_to_optimize
  function_optimizer: Graph size after: 1212 nodes (169), 1620 edges (274), time = 20.741ms.
  function_optimizer: function_optimizer did nothing. time = 0.656ms.

TensorFlow GraphDef: export success, saved as fire.pb (28.4 MB)

TensorFlow.js: starting export with tensorflowjs 3.11.0...
2021-12-20 00:14:48.818583: W tensorflow/stream_executor/platform/default/dso_loader.cc:64] Could not load dynamic library 'libcudart.so.11.0'; dlerror: libcudart.so.11.0: cannot open shared object file: No such file or directory; LD_LIBRARY_PATH: /home/tuanvuong/.local/lib/python3.8/site-packages/cv2/../../lib64:
2021-12-20 00:14:48.818663: I tensorflow/stream_executor/cuda/cudart_stub.cc:29] Ignore above cudart dlerror if you do not have a GPU set up on your machine.
2021-12-20 00:14:52.889539: I tensorflow/core/grappler/optimizers/meta_optimizer.cc:1149] Optimization results for grappler item: graph_to_optimize
  debug_stripper: debug_stripper did nothing. time = 0.274ms.
  model_pruner: Graph size after: 1068 nodes (-140), 1301 edges (-202), time = 13.247ms.
  constant_folding: Graph size after: 839 nodes (-229), 1058 edges (-243), time = 121.874ms.
  arithmetic_optimizer: Graph size after: 839 nodes (0), 1058 edges (0), time = 50.442ms.
  dependency_optimizer: Graph size after: 820 nodes (-19), 901 edges (-157), time = 13.396ms.
  model_pruner: Graph size after: 820 nodes (0), 901 edges (0), time = 9.462ms.
  constant_folding: Graph size after: 820 nodes (0), 901 edges (0), time = 67.964ms.
  arithmetic_optimizer: Graph size after: 820 nodes (0), 901 edges (0), time = 29.49ms.
  dependency_optimizer: Graph size after: 820 nodes (0), 901 edges (0), time = 15.473ms.
  debug_stripper: debug_stripper did nothing. time = 0.887ms.
  model_pruner: Graph size after: 820 nodes (0), 901 edges (0), time = 8.765ms.
  constant_folding: Graph size after: 820 nodes (0), 901 edges (0), time = 58.099ms.
  arithmetic_optimizer: Graph size after: 820 nodes (0), 901 edges (0), time = 29.504ms.
  dependency_optimizer: Graph size after: 820 nodes (0), 901 edges (0), time = 16.326ms.
  model_pruner: Graph size after: 820 nodes (0), 901 edges (0), time = 10.605ms.
  constant_folding: Graph size after: 820 nodes (0), 901 edges (0), time = 42.357ms.
  arithmetic_optimizer: Graph size after: 820 nodes (0), 901 edges (0), time = 29.317ms.
  dependency_optimizer: Graph size after: 820 nodes (0), 901 edges (0), time = 12.252ms.

2021-12-20 00:14:53.833821: I tensorflow/core/grappler/optimizers/meta_optimizer.cc:1149] Optimization results for grappler item: graph_to_optimize
  remapper: Graph size after: 758 nodes (-62), 839 edges (-62), time = 47.653ms.
  constant_folding: Graph size after: 758 nodes (0), 839 edges (0), time = 63.682ms.
  arithmetic_optimizer: Graph size after: 758 nodes (0), 839 edges (0), time = 22.657ms.
  dependency_optimizer: Graph size after: 758 nodes (0), 839 edges (0), time = 13.78ms.
  remapper: Graph size after: 758 nodes (0), 839 edges (0), time = 10.563ms.
  constant_folding: Graph size after: 758 nodes (0), 839 edges (0), time = 33.498ms.
  arithmetic_optimizer: Graph size after: 758 nodes (0), 839 edges (0), time = 25.21ms.
  dependency_optimizer: Graph size after: 758 nodes (0), 839 edges (0), time = 12.781ms.

Writing weight file fire_web_model/model.json...
TensorFlow.js: export success, saved as fire_web_model (28.5 MB)

Export complete (65.36s)
Results saved to /mnt/e/(2021-2022)/HK I/Do An Chuyen Nganh/web-Drone/train
Visualize with https://netron.app
```