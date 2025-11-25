"""
Rotas para o sistema de quiz
"""
from flask import Blueprint, request, jsonify
from database import db
from models import QuizResult
import json

quiz_bp = Blueprint('quiz', __name__, url_prefix='/api/quiz')


@quiz_bp.route('/result', methods=['POST'])
def save_result():
    """Salva resultado do quiz"""
    try:
        data = request.get_json()
        
        if not data:
            return jsonify({'error': 'Dados não fornecidos'}), 400
        
        score = data.get('score', 0)
        total_questions = data.get('total_questions', 10)
        nome = data.get('nome', '').strip() or None
        email = data.get('email', '').strip() or None
        answers = data.get('answers', [])
        
        # Calcular porcentagem
        percentage = (score / total_questions * 100) if total_questions > 0 else 0
        
        # Criar resultado
        quiz_result = QuizResult(
            nome=nome,
            email=email,
            score=score,
            total_questions=total_questions,
            percentage=percentage,
            answers=json.dumps(answers) if answers else None
        )
        
        db.session.add(quiz_result)
        db.session.commit()
        
        return jsonify({
            'success': True,
            'message': 'Resultado salvo com sucesso!',
            'data': quiz_result.to_dict()
        }), 201
        
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': f'Erro ao salvar resultado: {str(e)}'}), 500


@quiz_bp.route('/results', methods=['GET'])
def list_results():
    """Lista resultados do quiz (para estatísticas)"""
    try:
        page = request.args.get('page', 1, type=int)
        per_page = request.args.get('per_page', 20, type=int)
        
        query = QuizResult.query.order_by(QuizResult.created_at.desc())
        
        pagination = query.paginate(
            page=page,
            per_page=per_page,
            error_out=False
        )
        
        # Estatísticas gerais
        total_results = QuizResult.query.count()
        avg_score = db.session.query(db.func.avg(QuizResult.percentage)).scalar() or 0
        
        return jsonify({
            'success': True,
            'data': [result.to_dict() for result in pagination.items],
            'statistics': {
                'total_results': total_results,
                'average_percentage': round(avg_score, 2)
            },
            'pagination': {
                'page': page,
                'per_page': per_page,
                'total': pagination.total,
                'pages': pagination.pages
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao listar resultados: {str(e)}'}), 500


@quiz_bp.route('/statistics', methods=['GET'])
def get_statistics():
    """Obtém estatísticas do quiz"""
    try:
        total_results = QuizResult.query.count()
        avg_score = db.session.query(db.func.avg(QuizResult.percentage)).scalar() or 0
        avg_score = round(avg_score, 2) if avg_score else 0
        
        # Contar por faixas de pontuação
        excellent = QuizResult.query.filter(QuizResult.percentage >= 90).count()
        good = QuizResult.query.filter(
            QuizResult.percentage >= 70,
            QuizResult.percentage < 90
        ).count()
        fair = QuizResult.query.filter(
            QuizResult.percentage >= 50,
            QuizResult.percentage < 70
        ).count()
        poor = QuizResult.query.filter(QuizResult.percentage < 50).count()
        
        return jsonify({
            'success': True,
            'statistics': {
                'total_results': total_results,
                'average_percentage': avg_score,
                'by_range': {
                    'excellent': excellent,  # >= 90%
                    'good': good,  # 70-89%
                    'fair': fair,  # 50-69%
                    'poor': poor  # < 50%
                }
            }
        }), 200
        
    except Exception as e:
        return jsonify({'error': f'Erro ao obter estatísticas: {str(e)}'}), 500



