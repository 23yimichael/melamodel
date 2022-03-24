import tensorflow as tf
from tensorflow import keras
from tensorflow.keras.applications import *
from tensorflow.keras.models import Sequential
from tensorflow.keras import models, layers
from tensorflow.keras.layers import Dense, Dropout, Activation, Flatten, MaxPool2D, BatchNormalization,Resizing, InputLayer, Normalization, InputLayer, GlobalAveragePooling2D, Activation
from tensorflow.keras.layers import Conv2D, MaxPooling2D
from tensorflow.keras.callbacks import TensorBoard, ModelCheckpoint, EarlyStopping, CSVLogger
from tensorflow.keras.optimizers import Adam
from keras import backend as K
from PIL import Image 
import numpy as np
import time
import math
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.resnet50 import preprocess_input, decode_predictions
from IPython.display import display
from tensorflow.keras.optimizers import SGD
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from tensorflow.keras.applications import EfficientNetB7
from keras.initializers import glorot_uniform
import random
import tensorflowjs as tfjs



config = tf.compat.v1.ConfigProto()
config.gpu_options.allow_growth = True
session = tf.compat.v1.Session(config=config)



NAME = "Melanoma-Hackathon-Model{}".format(int(time.time()))
tensorboard = TensorBoard(log_dir='logs/{}'.format(NAME))

tf.random.set_seed(1234)

import pickle

pickle_in = open(r"Xtrain.pickle","rb")
X_train = (pickle.load(pickle_in))

pickle_in = open(r"ytrain.pickle","rb")
y_train = pickle.load(pickle_in)

pickle_in = open(r"Xval.pickle","rb")
X_val = pickle.load(pickle_in)

pickle_in = open(r"yval.pickle","rb")
y_val = pickle.load(pickle_in)

pickle_in = open(r"Xtest.pickle","rb")
X_test = pickle.load(pickle_in)

pickle_in = open(r"ytest.pickle","rb")
y_test = pickle.load(pickle_in)


y_train = np.array(y_train, dtype=np.float32)
y_val = np.array(y_val, dtype=np.float32)
y_test = np.array(y_test, dtype=np.float32)


BATCH_SIZE = 6
TRAIN_SIZE = len(X_train)
VAL_SIZE = len(X_val)

compute_steps_per_epoch = lambda x: int(math.ceil(1. * x / BATCH_SIZE))
steps_per_epoch = compute_steps_per_epoch(TRAIN_SIZE)
val_steps = compute_steps_per_epoch(VAL_SIZE)


#Model Checkpoint
save_filepath = r"D:\Github\Melanoma Hackathon\Best Models By Date\Saved_Models\weights-improvement-{epoch:02d}-{val_accuracy:.2f}.hdf5"
checkpoint = ModelCheckpoint(save_filepath, monitor='val_accuracy', verbose=1, save_best_only=True, mode='max')

# Early Stopping
early_stop = EarlyStopping(monitor='val_loss', patience=5, verbose=1)

#CSV logger (logs epoch, accuracy, val_accuracy, and val_loss)
log_filepath = r"D:\Github\Melanoma Hackathon\Best Models By Date\model_logs.csv"
log_csv = CSVLogger('log_filepath',separator=',', append=False)

#resume traning
model_0 = keras.models.load_model(r"D:\Github\Melanoma Hackathon\Best Models By Date\weights-improvement-02-0.92.hdf5")


model_1 = models.Sequential()
model_1.add(InputLayer(input_shape=(96,96,3), dtype='uint8',sparse=False,ragged=False, name='input0'))
model_1.add(ak.keras_layers.CastToFloat32(dtype='float32'))
model_1.add(Normalization(axis=(-1,),dtype='float32',name='normalization'))
model_1.add(Resizing(height=224,width=224,interpolation='bilinear',crop_to_aspect_ratio=False,dtype='float32',name='resizing'))
model_1.add((model_0.layers[4]))
model_1.add(GlobalAveragePooling2D(data_format='channels_last',keepdims=False,dtype='float32', name='GlobalPooling'))
model_1.add(Dense(units=64,activation='relu', dtype='float32', kernel_initializer='GlorotUniform'))
model_1.add(BatchNormalization())
model_1.add(Dense(units=1))
model_1.add(Activation('sigmoid'))

model_1.summary()

#resume training
model_1 = tf.keras.models.load_model(r"D:\Github\Melanoma Hackathon\Best Models By Date\Melamodel_93.hdf5")


optimizer=SGD(lr=0.001)
model_1.compile(optimizer=optimizer, loss=tf.keras.losses.binary_crossentropy, metrics=['accuracy'])

history = model_1.fit(X_train, y_train, validation_data=(X_val, y_val),
          epochs=35, batch_size=BATCH_SIZE, verbose=1, 
            steps_per_epoch = steps_per_epoch, validation_steps = val_steps,
            callbacks=[checkpoint, early_stop, log_csv,tensorboard])

model_1.evaluate(X_test, y_test)

#plot loss
loss_train = history.history['train_loss']
loss_val = history.history['val_loss']
epochs = range(1,35)
plt.plot(epochs, loss_train, 'g', label='Training loss')
plt.plot(epochs, loss_val, 'b', label='validation loss')
plt.title('Training and Validation loss')
plt.xlabel('Epochs')
plt.ylabel('Loss')
plt.legend()
plt.show()

loss_train = history.history['acc']
loss_val = history.history['val_acc']
epochs = range(1,11)
plt.plot(epochs, loss_train, 'g', label='Training accuracy')
plt.plot(epochs, loss_val, 'b', label='validation accuracy')
plt.title('Training and Validation accuracy')
plt.xlabel('Epochs')
plt.ylabel('Accuracy')
plt.legend()
plt.show()

# predict custom image
img = image.load_img(image_path, target_size=(96, 96))
img_array = image.img_to_array(img)
img_batch = np.expand_dims(img_array, axis=0)

display(img)
model_1.predict(img_batch)


# visualize model
plot_model(model_1, to_file=r'D:\Github\Melanoma Hackathon\Acc-Loss graphs\melomodel.png')
