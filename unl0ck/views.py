from django.shortcuts import render, redirect, HttpResponse
from django.core.exceptions import PermissionDenied as PD
from django.http import JsonResponse as js
import numpy as np
from . import func as fx
from django.conf import settings

model = fx.load_pickle(settings.PROJECT_ROOT + '/model.pkl')

def home(request):
    return render(request, "index.html", {})

def unlock(request):
    if request.method == "GET":
        if request.GET.get('userCode') != None and len(request.GET.get('userCode').strip()):
            user_code = request.GET.get('userCode').strip().upper()
            user_code = fx.formatIO(user_code)
            if model is None:
                return PD
            pred = ''.join([ hex(int(x)).split('x')[-1].upper() for x in model.predict(user_code)[0] ])
            return  js({ 'status': True, 'message': pred })
        return PD
    return PD
