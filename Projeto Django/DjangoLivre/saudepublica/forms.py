# No seu aplicativo Django, em forms.py
from django import forms
from .models import RegistroMedico
from .models import Paciente

class RegistroMedicoForm(forms.ModelForm):
    class Meta:
        model = RegistroMedico
        fields = '__all__'

class PacienteForm(forms.ModelForm):
    class Meta:
        model = Paciente
        fields = '__all__'