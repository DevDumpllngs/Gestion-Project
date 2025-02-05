import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { motion } from 'framer-motion';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

const FinancialSchema = Yup.object().shape({
  currency: Yup.string().required('Required'),
  monthlyIncome: Yup.string().required('Required'),
  incomeSource: Yup.string().required('Required'),
  monthlySpending: Yup.number()
    .min(0, 'Must be positive')
    .required('Required'),
  savingsPercentage: Yup.number()
    .min(0, 'Min 0%')
    .max(100, 'Max 100%')
    .required('Required'),
  spendingCategories: Yup.object().test(
    'at-least-one-category',
    'Select at least one category',
    (value) => Object.values(value).some(v => v.amount > 0)
  )
});

const FinancialProfileModal = ({ isOpen, onClose, onSave }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const categoriesList = [
    'Food', 'Housing', 'Transport', 
    'Entertainment', 'Shopping', 'Technology',
    'Health', 'Education', 'Travel'
  ];

  const initialCategoryState = categoriesList.reduce((acc, category) => ({
    ...acc,
    [category]: { selected: false, amount: 0 }
  }), {});

  const [spendingCategories, setSpendingCategories] = useState(initialCategoryState);

  const FinancialVisual = ({ step }) => (
    <svg viewBox="0 0 500 500" className="w-full h-64">
      {step === 1 && (
        <g transform="translate(100,100)">
          <motion.path
            d="M50 150 Q150 50 250 150 T450 150"
            fill="none"
            stroke="#4F46E5"
            strokeWidth="8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 2 }}
          />
          <motion.circle
            cx="250"
            cy="150"
            r="20"
            fill="#6366F1"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5 }}
          />
        </g>
      )}
      {step === 2 && (
        <g transform="translate(100,100)">
          <motion.path
            d="M50 50 L250 250 L450 50"
            fill="none"
            stroke="#10B981"
            strokeWidth="8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
          <motion.rect
            x="200"
            y="200"
            width="100"
            height="100"
            fill="#34D399"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </g>
      )}
    </svg>
  );

  const handleCategoryChange = (category, field, value) => {
    setSpendingCategories(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [field]: field === 'selected' ? value : Number(value)
      }
    }));
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white p-8 text-left align-middle shadow-2xl transition-all">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full"
                >
                  <XMarkIcon className="h-6 w-6 text-gray-600" />
                </button>

                <Formik
                  initialValues={{
                    currency: 'USD',
                    monthlyIncome: '',
                    incomeSource: '',
                    monthlySpending: 0,
                    savingsPercentage: 20,
                    financialGoal: '',
                    wantsAlerts: true,
                    reportFrequency: 'monthly'
                  }}
                  validationSchema={FinancialSchema}
                  onSubmit={(values) => {
                    onSave({
                      ...values,
                      spendingCategories
                    });
                    onClose();
                  }}
                >
                  {({ values, errors, touched, setFieldValue }) => (
                    <Form className="space-y-8">
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                      >
                        <div className="text-center">
                          <Dialog.Title
                            as="h3"
                            className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
                          >
                            Financial Profile
                          </Dialog.Title>
                          <p className="mt-2 text-gray-600">
                            Help us understand your financial habits better
                          </p>
                        </div>

                        <FinancialVisual step={currentStep} />

                        {/* Step 1: Información Básica */}
                        {currentStep === 1 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Main Currency
                                </label>
                                <Field
                                  as="select"
                                  name="currency"
                                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                >
                                  <option value="USD">USD</option>
                                  <option value="EUR">EUR</option>
                                  <option value="MXN">MXN</option>
                                </Field>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Monthly Income
                                </label>
                                <div className="space-y-2">
                                  {['< $1000', '$1000-$3000', '$3000-$5000', '> $5000'].map((option) => (
                                    <label key={option} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded-lg">
                                      <Field 
                                        type="radio" 
                                        name="monthlyIncome" 
                                        value={option} 
                                        className="text-indigo-600"
                                      />
                                      <span className="text-gray-700">{option}</span>
                                    </label>
                                  ))}
                                  {touched.monthlyIncome && errors.monthlyIncome && (
                                    <div className="text-red-500 text-sm">{errors.monthlyIncome}</div>
                                  )}
                                </div>
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Income Source
                                </label>
                                <Field
                                  as="select"
                                  name="incomeSource"
                                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                >
                                  <option value="">Select source</option>
                                  <option value="Salary">Salary</option>
                                  <option value="Business">Business</option>
                                  <option value="Investments">Investments</option>
                                </Field>
                                {touched.incomeSource && errors.incomeSource && (
                                  <div className="text-red-500 text-sm">{errors.incomeSource}</div>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Total Monthly Spending ($)
                                </label>
                                <Field
                                  type="number"
                                  name="monthlySpending"
                                  className="w-full p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500"
                                />
                                {touched.monthlySpending && errors.monthlySpending && (
                                  <div className="text-red-500 text-sm">{errors.monthlySpending}</div>
                                )}
                              </div>
                            </div>
                          </motion.div>
                        )}

                        {/* Step 2: Gastos por Categoría */}
                        {currentStep === 2 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              {categoriesList.map((category) => (
                                <motion.div
                                  key={category}
                                  whileHover={{ scale: 1.02 }}
                                  className={`p-4 rounded-lg transition-all ${
                                    spendingCategories[category].selected
                                      ? 'bg-indigo-50 border-2 border-indigo-500'
                                      : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                  }`}
                                >
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium">{category}</span>
                                    <label className="flex items-center gap-2">
                                      <input
                                        type="checkbox"
                                        checked={spendingCategories[category].selected}
                                        onChange={(e) => handleCategoryChange(category, 'selected', e.target.checked)}
                                        className="w-4 h-4 text-indigo-600"
                                      />
                                    </label>
                                  </div>
                                  {spendingCategories[category].selected && (
                                    <motion.div
                                      initial={{ opacity: 0 }}
                                      animate={{ opacity: 1 }}
                                      className="mt-2"
                                    >
                                      <label className="block text-sm text-gray-600 mb-1">
                                        Monthly Amount ($)
                                      </label>
                                      <input
                                        type="number"
                                        value={spendingCategories[category].amount}
                                        onChange={(e) => handleCategoryChange(category, 'amount', e.target.value)}
                                        className="w-full p-2 rounded-md border border-gray-300"
                                        min="0"
                                      />
                                    </motion.div>
                                  )}
                                </motion.div>
                              ))}
                            </div>
                          </motion.div>
                        )}

                        {/* Step 3: Objetivos */}
                        {currentStep === 3 && (
                          <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-6"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Savings Goal (% of income)
                                </label>
                                <Field
                                  type="range"
                                  name="savingsPercentage"
                                  min="0"
                                  max="100"
                                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="text-center text-indigo-600 font-medium mt-2">
                                  {values.savingsPercentage}%
                                </div>
                                {touched.savingsPercentage && errors.savingsPercentage && (
                                  <div className="text-red-500 text-sm">{errors.savingsPercentage}</div>
                                )}
                              </div>

                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Financial Goals
                                </label>
                                <div className="space-y-3">
                                  {['Emergency Fund', 'Debt Free', 'Home Ownership', 'Travel'].map((goal) => (
                                    <motion.div
                                      key={goal}
                                      whileHover={{ scale: 1.02 }}
                                      className={`p-3 rounded-lg cursor-pointer ${
                                        values.financialGoal === goal
                                          ? 'bg-purple-100 border-2 border-purple-500'
                                          : 'bg-gray-50 hover:bg-gray-100 border-2 border-transparent'
                                      }`}
                                      onClick={() => setFieldValue('financialGoal', goal)}
                                    >
                                      <span className="text-gray-700">{goal}</span>
                                    </motion.div>
                                  ))}
                                </div>
                              </div>
                            </div>

                            <div className="mt-6">
                              <label className="flex items-center gap-2">
                                <Field 
                                  type="checkbox" 
                                  name="wantsAlerts" 
                                  className="w-5 h-5 text-indigo-600"
                                />
                                <span className="text-gray-700">Receive budget alerts</span>
                              </label>
                            </div>
                          </motion.div>
                        )}

                        {/* Navigation */}
                        <div className="flex justify-between items-center pt-8">
                          {currentStep > 1 && (
                            <motion.button
                              type="button"
                              onClick={() => setCurrentStep(prev => prev - 1)}
                              className="px-6 py-2 text-gray-600 hover:text-gray-800 flex items-center gap-2"
                              whileHover={{ scale: 1.05 }}
                            >
                              ← Previous
                            </motion.button>
                          )}
                          
                          <div className="flex-1 text-center">
                            {[1, 2, 3].map((step) => (
                              <div
                                key={step}
                                className={`h-2 w-2 mx-1 inline-block rounded-full ${
                                  currentStep >= step ? 'bg-indigo-500' : 'bg-gray-300'
                                }`}
                              />
                            ))}
                          </div>

                          {currentStep < 3 ? (
                            <motion.button
                              type="button"
                              onClick={() => setCurrentStep(prev => prev + 1)}
                              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                              whileHover={{ scale: 1.05 }}
                            >
                              Next →
                            </motion.button>
                          ) : (
                            <button
                              type="submit"
                              className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                            >
                              Save Profile
                            </button>
                          )}
                        </div>
                      </motion.div>
                    </Form>
                  )}
                </Formik>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default FinancialProfileModal;